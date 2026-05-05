import { Request, Response } from "express";
import * as todoService from "../services/todos";
import { CustomError } from "../types/error";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.fetchTodos(req.query);
    res.status(200).send({
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.createTodo({
      ...req.body,
      user_id: req.user?.id,
    });
    res.status(201).send({
      message: "Todo created successfully",
      data: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: {
          id: todo.status_id,
          name: todo.status_name,
        },
        created_at: todo.created_at,
        updated_at: todo.updated_at,
      },
    });
  } catch (error) {
    console.log(error);
    const err = error as CustomError;
    if (err.statusCode) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const fetchTodoById = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.fetchTodoById(req.params.id as string);
    res.status(200).send({
      message: "Todo fetched successfully",
      data: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: {
          id: todo.status_id,
          name: todo.status_name,
        },
        created_at: todo.created_at,
        updated_at: todo.updated_at,
      },
    });
  } catch (error) {
    console.log(error);
    const err = error as CustomError;
    if (err.statusCode) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existingTodo = await todoService.fetchTodoById(id);

    if (!existingTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    const todo = await todoService.updateTodo(id, req.body);
    res.status(200).send({
      message: "Todo updated successfully",
      data: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: {
          id: todo.status_id,
          name: todo.status_name,
        },
        created_at: todo.created_at,
        updated_at: todo.updated_at,
      },
    });
  } catch (error) {
    console.log(error);
    const err = error as CustomError;
    if (err.statusCode === 404) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
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
    const err = error as CustomError;
    if (err.statusCode === 404) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
