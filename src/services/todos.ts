import db from "../db";
import { todoType, todoInput, todoQuery } from "../types/todo";
import { ResponseType } from "../types/response";
import { taskReminderQueue } from "../queues/task-reminder";
import redis from "../utils/redis";

// Helpers

interface Job {
  reminderJobId?: string;
  dueJobId?: string;
}
const scheduleTodoJobs = async (todoId: string, due_date: string) => {
  const now = Date.now();
  const dueTime = new Date(due_date).getTime();

  if (dueTime <= now) return;

  const todo = await db("todos as t")
    .join("users as u", "t.user_id", "u.id")
    .where("t.id", todoId)
    .select("t.title", "u.email")
    .first();

  if (!todo) return;

  const jobs: Job = {};
  const reminderDelay = dueTime - now - 5 * 60 * 1000;
  const dueDelay = dueTime - now;

  if (reminderDelay > 0) {
    const job = await taskReminderQueue.add(
      "task-reminder",
      { title: todo.title, email: todo.email, type: "reminder" },
      { delay: reminderDelay },
    );
    jobs.reminderJobId = job.id;
  }

  const dueJob = await taskReminderQueue.add(
    "due",
    { title: todo.title, email: todo.email, type: "due" },
    { delay: dueDelay },
  );
  jobs.dueJobId = dueJob.id;

  await redis.set(`todo-jobs:${todoId}`, JSON.stringify(jobs));
};

const cancelTodoJobs = async (todoId: string) => {
  const stored = await redis.get(`todo-jobs:${todoId}`);
  if (!stored) return;

  const { reminderJobId, dueJobId } = JSON.parse(stored);
  if (reminderJobId) await taskReminderQueue.remove(reminderJobId);
  if (dueJobId) await taskReminderQueue.remove(dueJobId);

  await redis.del(`todo-jobs:${todoId}`);
};

export const fetchTodos = async (
  query: todoQuery,
): Promise<ResponseType<todoType[]>> => {
  const dbQuery = db("todos as t")
    .join("users as u", "t.user_id", "u.id")
    .join("statuses as s", "t.status_id", "s.id")
    .select("t.*", "s.name as status_name")
    .orderBy("t.created_at", "desc");

  if (query.search) {
    dbQuery
      .whereILike("t.title", `%${query.search}%`)
      .orWhereILike("t.description", `%${query.search}%`);
  }

  if (query.status) {
    dbQuery.where("t.status_id", query.status);
  }

  return { success: true, data: await dbQuery };
};

export const createTodo = async (
  todoPayload: todoInput,
): Promise<ResponseType<todoType>> => {
  const { title, description, user_id, status_id, due_date } = todoPayload;

  const isExistingTodo = await db("todos").where({ title, user_id }).first();

  if (isExistingTodo) {
    return {
      success: false,
      message: "Todo with the same title already exists for this user",
      statusCode: 409,
    };
  }

  const [result] = await db<todoInput>("todos")
    .insert({
      title,
      description,
      user_id,
      status_id,
      due_date,
    })
    .returning<todoType[]>("*");

  if (due_date && due_date !== "" && due_date !== null) {
    await scheduleTodoJobs(result.id, due_date);
  }

  const newTodo = await db("todos as t")
    .join("statuses as s", "t.status_id", "s.id")
    .select("t.*", "s.id as status_id", "s.name as status_name")
    .where("t.id", result.id)
    .first<todoType>();

  return { success: true, data: newTodo };
};

export const fetchTodoById = async (
  id: string,
): Promise<ResponseType<todoType>> => {
  const result = await db<todoType>("todos as t")
    .join("statuses as s", "t.status_id", "s.id")
    .select("t.*", "s.id as status_id", "s.name as status_name")
    .where("t.id", id)
    .first<todoType>();

  if (!result) {
    return {
      success: false,
      message: "Todo not found",
      statusCode: 404,
    };
  }

  return { success: true, data: result };
};

export const updateTodo = async (
  id: string,
  updatePayload: Partial<todoInput>,
): Promise<ResponseType<todoType>> => {
  const { title, description, status_id, due_date } = updatePayload;

  const updateData: Partial<todoInput> = {
    title: title,
    description: description,
    status_id: status_id,
    updated_at: new Date(),
  };

  if (due_date) {
    updateData.due_date = due_date;
  }

  const [result] = await db<todoInput>("todos")
    .where("id", id)
    .update(updateData)
    .returning<todoType[]>("*");

  const updatedTodo = await db<todoType>("todos as t")
    .join("statuses as s", "t.status_id", "s.id")
    .select("t.*", "s.id as status_id", "s.name as status_name")
    .where("t.id", result.id)
    .first();

  if (due_date) {
    await cancelTodoJobs(id);
    await scheduleTodoJobs(id, updateData.due_date as string);
  }

  return { success: true, data: updatedTodo };
};

export const deleteTodo = async (id: string): Promise<ResponseType<void>> => {
  await cancelTodoJobs(id);
  await db("todos").where("id", id).del();
  return { success: true, data: undefined };
};
