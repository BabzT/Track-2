import z from "zod";

export const todoSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string(),
  status_id: z.uuid({ message: "Invalid status ID" }),
  due_date: z
    .string()
    .min(5, { message: "Due date must be a string/null" })
    .nullable(),
});
