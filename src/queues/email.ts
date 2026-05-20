import { Queue, Worker } from "bullmq";
import "dotenv/config";
import resend from "../utils/mailer";

const connection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
};

export const emailQueue = new Queue("emails", { connection });

new Worker(
  "emails",
  async (job) => {
    const { to, subject, html, text } = job.data;
    await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to,
      subject,
      ...(html ? { html } : { text }),
    });
  },
  { connection },
);
