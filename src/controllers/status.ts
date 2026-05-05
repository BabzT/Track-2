import { Request, Response } from "express";
import * as statusService from "../services/status";

export const getStatuses = async (req: Request, res: Response) => {
  try {
    const statuses = await statusService.fetchStatuses();
    return res.status(200).send({
      message: "Statuses fetched successfully",
      data: statuses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
