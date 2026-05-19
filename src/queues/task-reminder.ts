import "dotenv/config";
import db from "../db";
import { Queue, Worker } from "bullmq";
import { emailQueue } from "./email";
import { getTaskReminderEmailTemplate } from "../utils/templates/taskReminderEmail";

const connection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
};

export const taskReminderQueue = new Queue("task-reminder", { connection });

new Worker(
  "task-reminder",
  async (job) => {
    const { todoId, type } = job.data;

    const todo = await db("todos as t")
      .join("users as u", "t.user_id", "u.id")
      .where("t.id", todoId)
      .select("t.title", "u.email", "t.due_date")
      .first();

    if (!todo) return;

    const subject =
      type === "reminder"
        ? `Reminder: "${todo.title}" is due in 5 minutes`
        : `"${todo.title}" is due now`;

    const html = getTaskReminderEmailTemplate(todo.title, type);

    await emailQueue.add("send", { to: todo.email, subject, html });
  },
  { connection },
);
