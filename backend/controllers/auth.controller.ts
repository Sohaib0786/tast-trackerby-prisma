import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ message: "User exists" });

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  res.status(201).json({ message: "User registered" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  res.json({ accessToken, refreshToken });
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  const user = await prisma.user.findFirst({
    where: { refreshToken },
  });

  if (!user) return res.status(403).json({ message: "Invalid refresh token" });

  const accessToken = generateAccessToken(user.id);
  res.json({ accessToken });
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  await prisma.user.updateMany({
    where: { refreshToken },
    data: { refreshToken: null },
  });

  res.json({ message: "Logged out" });
};
