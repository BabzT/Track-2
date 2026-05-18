import { Queue, Worker } from "bullmq";
import "dotenv/config";
import redis from "../utils/redis";
import transporter from "../utils/mailer";

export const emailQueue = new Queue("emails", {
  connection: redis,
});

new Worker(
  "emails",
  async (job) => {
    const { to, subject, text } = job.data;
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
    });
  },

  { connection: redis },
);
