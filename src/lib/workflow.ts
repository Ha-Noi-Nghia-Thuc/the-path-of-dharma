import nodemailer from "nodemailer";
import config from "./config";
import { Client as QStashClient } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const triggerOnboardingWorkflow = async ({
  email,
  fullName,
}: {
  email: string;
  fullName: string;
}) => {
  const result = await qstashClient.publishJSON({
    url: `${config.env.apiEndpoint}/api/workflow/onboarding`,
    body: {
      email,
      fullName,
    },
  });

  console.log("🚀 QStash Trigger result:", result);
};

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  console.log("📧 Đang gửi email tới:", email);

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
    console.log("✅ Đã gửi email thành công");
  } catch (err) {
    console.error("❌ Gửi email thất bại:", err);
  }
};
