import nodemailer from "nodemailer";
import config from "./config";

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

  await transporter.sendMail({
    from: `"Hà Nội Nghĩa Thục" <${config.env.smtp.user}>`,
    to: email,
    subject: subject,
    html: message,
  });
};
