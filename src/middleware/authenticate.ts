import { Request, Response, NextFunction } from "express";
import db from "../db";
import "../types";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers["token"] as string;
    if (!token) {
      const err = new Error("No token provided") as any;
      err.statusCode = 401;
      throw err;
    }

    // check if user exists in the database
    const user = await db("users").where({ id: token }).select("*").first();

    if (!user) {
      const err = new Error("Invalid token") as any;
      err.statusCode = 401;
      throw err;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
