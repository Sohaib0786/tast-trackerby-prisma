import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId: req.userId!,
    },
  });

  res.status(201).json(task);
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 10, status, search } = req.query;

  const tasks = await prisma.task.findMany({
    where: {
      userId: req.userId,
      status: status as string | undefined,
      title: search
        ? { contains: search as string, mode: "insensitive" }
        : undefined,
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: { createdAt: "desc" },
  });

  res.json(tasks);
};

export const toggleTask = async (req: AuthRequest, res: Response) => {
  const task = await prisma.task.findUnique({
    where: { id: req.params.id },
  });

  if (!task || task.userId !== req.userId)
    return res.status(404).json({ message: "Task not found" });

  const updated = await prisma.task.update({
    where: { id: task.id },
    data: {
      status: task.status === "pending" ? "completed" : "pending",
    },
  });

  res.json(updated);
};
