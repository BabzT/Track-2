import express from "express";
import { Request, Response } from "express";
import { authenticate } from "./middleware/authenticate";
import authRoutes from "./routes/auth";
import todosRoutes from "./routes/todos";
import statusRoutes from "./routes/status";
import usersRoutes from "./routes/users";

const app = express();

app.use(express.json());

// Import routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", authenticate, todosRoutes);
app.use("/api/statuses", authenticate, statusRoutes);
app.use("/api/users", authenticate, usersRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Todo APP!");
});

//404 handler
app.use((req: Request, res: Response) => {
  res.status(404).send({ message: `Route ${req.method} ${req.url} not found` });
});

export default app;
