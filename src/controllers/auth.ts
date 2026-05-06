import { Request, Response } from "express";
import * as authService from "../services/auth";
import { registerType } from "../types/auth";
import { loginType } from "../types/auth";
import { CustomError } from "../types/error";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const registerPayload: registerType = req.body;
    const user = await authService.createAccount(registerPayload);
    res.status(201).send({
      message: "Registration Successful",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.log(error);
    const err = error as CustomError;
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginPayload: loginType = req.body;
    const user = await authService.login(loginPayload);

    res.status(200).send({
      message: "Login Successful",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.log(error);
    const err = error as CustomError;
    const statusCode = err.statusCode;
    const message = err.message;
    if (statusCode === 401) {
      return res.status(statusCode).json({ message: message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
