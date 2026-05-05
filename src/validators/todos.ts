import z from "zod";

export const todoSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string(),
  status_id: z.uuid({ message: "Invalid status ID" }),
});
