import db from "../db";
import { statusType } from "../types/status";

export const fetchStatuses = async (): Promise<statusType[]> => {
  const result = await db("statuses").select("*");
  return result;
};
