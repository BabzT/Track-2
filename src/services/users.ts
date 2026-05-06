import db from "../db";
import { userType } from "../types/user";
import { ResponseType } from "../types/response";

export const fetchMe = async (id: string): Promise<ResponseType<userType>> => {
  const result = await db("users")
    .where({ id })
    .select(["id", "email", "name", "created_at"])
    .first();
  return { success: true, data: result };
};
