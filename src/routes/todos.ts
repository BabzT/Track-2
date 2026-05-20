import express from "express";
import * as todoController from "../controllers/todos";
import {
  validateRequestBody,
  validateRequestParams,
} from "../middleware/validate";
import { todoSchema } from "../validators/todos";
import { paramsSchema } from "../types/params";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.get("/", authenticate, todoController.getTodos);

router.post(
  "/",
  authenticate,
  validateRequestBody(todoSchema),
  todoController.createTodo,
);

router.get(
  "/:id",
  authenticate,
  validateRequestParams(paramsSchema),
  todoController.fetchTodoById,
);

router.patch(
  "/:id",
  authenticate,
  validateRequestParams(paramsSchema),
  validateRequestBody(todoSchema),
  todoController.updateTodo,
);

router.delete(
  "/:id",
  authenticate,
  validateRequestParams(paramsSchema),
  todoController.deleteTodo,
);

export default router;
