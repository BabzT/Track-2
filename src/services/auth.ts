import db from "../db";
import { registerType } from "../types/auth";
import { userType } from "../types/user";
import { loginType } from "../types/auth";

export const createAccount = async (
  registerPayload: registerType,
): Promise<userType> => {
  const { email, name, password } = registerPayload;

  const existingUser = await db("users").where({ email }).select("id").first();

  if (existingUser) {
    const err = new Error("Email already exists") as any;
    err.statusCode = 409;
    throw err;
  }

  const result = await db("users")
    .insert({
      email,
      name,
      password,
    })
    .returning(["id", "name", "email", "created_at"])
    .first();
  return result;
};

export const login = async (loginPayload: loginType): Promise<userType> => {
  const { email, password } = loginPayload;
  const user = await db("users").where({ email }).select("*").first();

  if (!user) {
    const err = new Error("Invalid email") as any;
    err.statusCode = 401;
    throw err;
  }

  const isPasswordValid = user && user.password === password;

  if (!isPasswordValid) {
    const err = new Error("Invalid password") as any;
    err.statusCode = 401;
    throw err;
  }

  return user;
};
