import db from "../db";
import { statusType } from "../types/status";
import { ResponseType } from "../types/response";

export const fetchStatuses = async (): Promise<ResponseType<statusType[]>> => {
  const result = await db("statuses").select("*");
  return { success: true, data: result };
};
