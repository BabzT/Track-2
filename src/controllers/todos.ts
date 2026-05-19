import { Request, Response } from "express";
import * as todoService from "../services/todos";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const response = await todoService.fetchTodos(req.query);

    if (!response.success) {
      throw new Error("Failed to fetch todos");
    }

    res.status(200).send({
      message: "Todos fetched successfully",
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const response = await todoService.createTodo({
      ...req.body,
      user_id: req.user?.id,
    });

    if (!response.success) {
      return res
        .status(response.statusCode || 400)
        .json({ message: response.message || "Failed to create todo" });
    }

    res.status(201).send({
      message: "Todo created successfully",
      data: {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        status: {
          id: response.data.status_id,
          name: response.data.status_name,
        },
        due_date: response.data.due_date,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchTodoById = async (req: Request, res: Response) => {
  try {
    const response = await todoService.fetchTodoById(req.params.id as string);

    if (!response.success) {
      return res
        .status(response.statusCode || 404)
        .json({ message: response.message || "Todo not found" });
    }

    res.status(200).send({
      message: "Todo fetched successfully",
      data: {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        status: {
          id: response.data.status_id,
          name: response.data.status_name,
        },
        due_date: response.data.due_date,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existingTodo = await todoService.fetchTodoById(id);

    if (!existingTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    const response = await todoService.updateTodo(id, req.body);

    if (!response.success) {
      return console.log("Failed to update todo");
    }

    res.status(200).send({
      message: "Todo updated successfully",
      data: {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        status: {
          id: response.data.status_id,
          name: response.data.status_name,
        },
        due_date: response.data.due_date,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existingTodo = await todoService.fetchTodoById(id);

    if (!existingTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    await todoService.deleteTodo(id);
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
