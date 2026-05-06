import db from "../db";
import { registerType } from "../types/auth";
import { userType } from "../types/user";
import { loginType } from "../types/auth";
import { ResponseType } from "../types/response";

export const createAccount = async (
  registerPayload: registerType,
): Promise<ResponseType<userType>> => {
  const { email, name, password } = registerPayload;

  const existingUser = await db("users").where({ email }).select("id").first();

  if (existingUser) {
    return {
      success: false,
      message: "Email already exists",
      statusCode: 409,
    };
  }

  const result = await db("users")
    .insert({
      email,
      name,
      password,
    })
    .returning(["id", "name", "email", "created_at"])
    .first();
  return { success: true, data: result };
};

export const login = async (
  loginPayload: loginType,
): Promise<ResponseType<userType>> => {
  const { email, password } = loginPayload;
  const user = await db("users").where({ email }).select("*").first();

  if (!user) {
    return {
      success: false,
      message: "Invalid email",
      statusCode: 401,
    };
  }

  const isPasswordValid = user && user.password === password;

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid password",
      statusCode: 401,
    };
  }

  return {
    success: true,
    data: user,
  };
};
