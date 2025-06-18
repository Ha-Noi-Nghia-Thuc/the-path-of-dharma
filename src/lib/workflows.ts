import { Client as QStashClient } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";
import nodemailer from "nodemailer";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

// initialize QStash client
const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

// trigger onboarding workflow via QStash
export const triggerOnboardingWorkflow = async ({
  email,
  fullName,
}: {
  email: string;
  fullName: string;
}) => {
  try {
    await qstashClient.publishJSON({
      url: `${config.env.apiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    });
  } catch (error) {
    console.error("Failed to trigger onboarding workflow:", error);
  }
};

// send email using configured SMTP
export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: config.env.smtp.host,
    port: Number(config.env.smtp.port),
    secure: true,
    auth: {
      user: config.env.smtp.user,
      pass: config.env.smtp.pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Hà Nội Nghĩa Thục" <${config.env.smtp.user}>`,
      to: email,
      subject,
      html: message,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};
