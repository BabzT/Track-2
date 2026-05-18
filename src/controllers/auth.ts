import { Request, Response } from "express";
import * as authService from "../services/auth";
import * as userService from "../services/users";
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
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          created_at: response.data.created_at,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const response = await authService.refreshAccessToken(refreshToken);

    if (!response.success) {
      return res.status(response.statusCode || 401).json({
        message: response.message || "Could not refresh access token",
      });
    }

    res.status(200).json({
      message: "Access token refreshed successfully",
      data: {
        accessToken: response.data.accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await userService.getUserByEmail(email);

    if (!user.success) {
      return res.status(404).json({ message: "User not found" });
    }

    const response = await authService.forgotPassword(email);

    if (!response.success) {
      return res
        .status(response.statusCode || 400)
        .json({ message: response.message || "Failed to send OTP" });
    }

    res.status(200).json({
      message: "Password reset OTP sent to email successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;

    const response = await authService.resetPassword(email, otp, newPassword);

    if (!response.success) {
      return res
        .status(response.statusCode || 400)
        .json({ message: response.message || "Failed to reset password" });
    }

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    await authService.logout(refreshToken);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
