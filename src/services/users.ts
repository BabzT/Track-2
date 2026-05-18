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

export const getUserByEmail = async (
  email: string,
): Promise<ResponseType<userType>> => {
  const result = await db("users")
    .where({ email })
    .select(["id", "email", "name", "created_at"])
    .first();

  if (!result) {
    return {
      success: false,
      message: "User not found",
      statusCode: 404,
    };
  }

  return { success: true, data: result };
};
