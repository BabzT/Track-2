import db from "../db";
import { todoType, todoInput, todoQuery } from "../types/todo";
import { CustomError } from "../types/error";

export const fetchTodos = async (query: todoQuery): Promise<todoType[]> => {
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

  return dbQuery;
};

export const createTodo = async (todoPayload: todoInput): Promise<todoType> => {
  const { title, description, user_id, status_id } = todoPayload;

  const isExistingTodo = await db("todos").where({ title, user_id }).first();

  if (isExistingTodo) {
    const err = new Error("Todo already exists") as CustomError;
    err.statusCode = 409;
    throw err;
  }

  const [result] = await db<todoInput>("todos")
    .insert({
      title,
      description,
      user_id,
      status_id,
    })
    .returning<todoType[]>("*");

  const newTodo = db("todos as t")
    .join("statuses as s", "t.status_id", "s.id")
    .select("t.*", "s.id as status_id", "s.name as status_name")
    .where("t.id", result.id)
    .first<todoType>();

  return newTodo;
};

export const fetchTodoById = async (id: string): Promise<todoType> => {
  const result = await db<todoType>("todos as t")
    .join("statuses as s", "t.status_id", "s.id")
    .select("t.*", "s.id as status_id", "s.name as status_name")
    .where("t.id", id)
    .first<todoType>();

  if (!result) {
    const err = new Error("Todo not found") as CustomError;
    err.statusCode = 404;
    throw err;
  }

  return result;
};

export const updateTodo = async (
  id: string,
  updatePayload: Partial<todoInput>,
): Promise<todoType> => {
  const { title, description, status_id } = updatePayload;
  const [result] = await db<todoInput>("todos")
    .where("id", id)
    .update({
      title: title,
      description: description,
      status_id: status_id,
      updated_at: new Date(),
    })
    .returning<todoType[]>("*");

  const updatedTodo = await db<todoType>("todos as t")
    .join("statuses as s", "t.status_id", "s.id")
    .select("t.*", "s.id as status_id", "s.name as status_name")
    .where("t.id", result.id)
    .first();

  return updatedTodo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await db("todos").where("id", id).del();
};
