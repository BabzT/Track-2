import { Request, Response } from "express";
import * as statusService from "../services/status";

export const getStatuses = async (req: Request, res: Response) => {
  try {
    const response = await statusService.fetchStatuses();
    if (!response.success) {
      return console.log("Failed to fetch statuses");
    }
    return res.status(200).send({
      message: "Statuses fetched successfully",
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
