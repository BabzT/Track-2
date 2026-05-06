import { Request, Response } from "express";
import * as usersService from "../services/users";

export const getMe = async (req: Request, res: Response) => {
  try {
    const response = await usersService.fetchMe(req.user?.id as string);

    if (!response.success) {
      return console.log("User not found");
    }

    return res.status(200).send({
      message: "User fetched successfully",
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
