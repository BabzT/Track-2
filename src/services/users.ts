import db from "../db";
import { userType } from "../types/user";

export const fetchMe = async (id: string): Promise<userType> => {
  const result = await db("users")
    .where({ id })
    .select(["id", "email", "name", "created_at"])
    .first();
  return result;
};
