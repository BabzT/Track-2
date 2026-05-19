import { Queue, Worker } from "bullmq";
import "dotenv/config";
import transporter from "../utils/mailer";

const connection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
};

export const emailQueue = new Queue("emails", { connection });

new Worker(
  "emails",
  async (job) => {
    const { to, subject, html, text } = job.data;
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      ...(html ? { html } : { text }),
    });
  },
  { connection },
);
