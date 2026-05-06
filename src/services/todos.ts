import db from "../db";
import { todoType, todoInput, todoQuery } from "../types/todo";
import { ResponseType } from "../types/response";

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
  const { title, description, user_id, status_id } = todoPayload;

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
    })
    .returning<todoType[]>("*");

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

  return { success: true, data: updatedTodo };
};

export const deleteTodo = async (id: string): Promise<ResponseType<void>> => {
  await db("todos").where("id", id).del();
  return { success: true, data: undefined };
};
