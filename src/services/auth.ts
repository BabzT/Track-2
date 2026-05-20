import db from "../db";
import "dotenv/config";
import brycpt from "bcrypt";
import { registerType } from "../types/auth";
import redis from "../utils/redis";
import resend from "../utils/mailer";
import { emailQueue } from "../queues/email";
import { loginType, loginResponseType } from "../types/auth";
import { ResponseType } from "../types/response";
import { renderEmail } from "../utils/templates/renderer";
import { generateOtp } from "../helpers/otp";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

export const createAccount = async (
  registerPayload: registerType,
): Promise<ResponseType<loginResponseType>> => {
  const { email, name, password } = registerPayload;

  const existingUser = await db("users").where({ email }).select("id").first();

  if (existingUser) {
    return {
      success: false,
      message: "Email already exists",
      statusCode: 409,
    };
  }

  const hashedPassword = await brycpt.hash(password, 10);

  const [result] = await db("users")
    .insert({
      email,
      name,
      password: hashedPassword,
    })
    .returning(["id", "name", "email", "created_at"]);

  await emailQueue.add("sendWelcomeEmail", {
    to: email,
    subject: "Welcome to Our App!",
    html: renderEmail("welcome", {
      name,
      emailTitle: "Welcome!",
      accentColor: "linear-gradient(90deg,#10b981,#059669)",
      footerText:
        "You're receiving this because you just created an account.<br>If this wasn't you, please contact support immediately.",
    }),
  });

  return { success: true, data: result };
};

export const login = async (
  loginPayload: loginType,
): Promise<ResponseType<loginResponseType>> => {
  const { email, password } = loginPayload;
  const user = await db("users").where({ email }).select("*").first();

  if (!user) {
    return {
      success: false,
      message: "Invalid email",
      statusCode: 401,
    };
  }

  const isPasswordValid =
    user && (await brycpt.compare(password, user.password));

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid password",
      statusCode: 401,
    };
  }

  const accessToken = generateAccessToken(user.id);

  const refreshToken = generateRefreshToken(user.id);

  await db("refresh_tokens").insert({
    user_id: user.id,
    token: refreshToken,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    success: true,
    data: { accessToken: accessToken, refreshToken: refreshToken, ...user },
  };
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<ResponseType<{ accessToken: string }>> => {
  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh token is required",
      statusCode: 400,
    };
  }

  const user_id = verifyRefreshToken(refreshToken);

  if (!user_id) {
    return {
      success: false,
      message: "Invalid refresh token",
      statusCode: 401,
    };
  }

  const storedToken = await db("refresh_tokens")
    .where({ token: refreshToken, user_id })
    .where("expires_at", ">", new Date())
    .select("id")
    .first();

  if (!storedToken) {
    return {
      success: false,
      message: "Invalid or expired refresh token",
      statusCode: 401,
    };
  }

  const newAccessToken = generateAccessToken(user_id);

  return {
    success: true,
    data: { accessToken: newAccessToken },
  };
};

export const forgotPassword = async (
  email: string,
): Promise<ResponseType<null>> => {
  const otp = generateOtp();

  await redis.set(`reset-otp:${email}`, otp, "EX", 5 * 60);

  await resend.emails.send({
    from: process.env.MAIL_FROM!,
    to: email,
    subject: "Password Reset OTP",
    html: renderEmail("password-reset", {
      otp,
      emailTitle: "Password Reset OTP",
      accentColor: "#334155",
      footerText:
        "This is an automated message. Please do not reply to this email.",
    }),
  });

  return {
    success: true,
    data: null,
  };
};

export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string,
): Promise<ResponseType<null>> => {
  const storedOtp = await redis.get(`reset-otp:${email}`);

  if (otp !== storedOtp) {
    return {
      success: false,
      message: "Invalid / Expired OTP",
      statusCode: 400,
    };
  }

  const hashedPassword = await brycpt.hash(newPassword, 10);

  await db("users").where({ email }).update({ password: hashedPassword });

  await redis.del(`reset-otp:${email}`);

  await emailQueue.add("sendPasswordResetConfirmationEmail", {
    to: email,
    subject: "Password Reset Successful",
    html: renderEmail("password-reset-success", {
      timestamp: new Date().toUTCString(),
      emailTitle: "Password Reset Successful",
      accentColor: "#334155",
      footerText:
        "This is an automated security notification. Please do not reply to this email.",
    }),
  });

  return {
    success: true,
    data: null,
  };
};

export const logout = async (refreshToken: string): Promise<void> => {
  await db("refresh_tokens").where({ token: refreshToken }).del();
};
