import "dotenv/config";
import { Queue, Worker } from "bullmq";
import { emailQueue } from "./email";
import { renderTaskReminderEmail } from "../utils/templates/renderer";

const connection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
};

export const taskReminderQueue = new Queue("task-reminder", { connection });

new Worker(
  "task-reminder",
  async (job) => {
    const { title, email, type } = job.data;

    const subject =
      type === "reminder"
        ? `Reminder: "${title}" is due in 5 minutes`
        : `"${title}" is due now`;

    const html = renderTaskReminderEmail(title, type);

    await emailQueue.add("send", { to: email, subject, html });
  },
  { connection },
);
