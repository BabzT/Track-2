import { Request, Response } from "express";
import * as authService from "../services/auth";
import { registerType } from "../types/auth";
import { loginType } from "../types/auth";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const registerPayload: registerType = req.body;
    const response = await authService.createAccount(registerPayload);

    if (!response.success) {
      return res
        .status(response.statusCode || 400)
        .json({ message: response.message || "Registration failed" });
    }

    res.status(201).send({
      message: "Registration Successful",
      data: {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        created_at: response.data.created_at,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginPayload: loginType = req.body;
    const response = await authService.login(loginPayload);

    if (!response.success) {
      return res
        .status(response.statusCode || 401)
        .json({ message: response.message || "Login failed" });
    }

    res.status(200).send({
      message: "Login Successful",
      data: {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        created_at: response.data.created_at,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
