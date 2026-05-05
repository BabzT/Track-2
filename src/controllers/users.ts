import { Request, Response } from "express";
import * as usersService from "../services/users";

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await usersService.fetchMe(req.user?.id as string);
    return res.status(200).send({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
