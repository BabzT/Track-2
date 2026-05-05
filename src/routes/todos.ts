import express from "express";
import * as todoController from "../controllers/todos";
import {
  validateRequestBody,
  validateRequestParams,
} from "../middleware/validate";
import { todoSchema } from "../validators/todos";
import { paramsSchema } from "../types/params";

const router = express.Router();

router.get("/", todoController.getTodos);

router.post("/", validateRequestBody(todoSchema), todoController.createTodo);

router.get(
  "/:id",
  validateRequestParams(paramsSchema),
  todoController.fetchTodoById,
);

router.patch(
  "/:id",
  validateRequestParams(paramsSchema),
  validateRequestBody(todoSchema),
  todoController.updateTodo,
);

router.delete(
  "/:id",
  validateRequestParams(paramsSchema),
  todoController.deleteTodo,
);

export default router;
