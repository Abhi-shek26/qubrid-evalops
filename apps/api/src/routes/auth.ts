import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { config } from "../lib/config";
import { auth, AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) return res.status(400).json({ success: false, message: "name, email and password (8+ chars) are required" });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ success: false, message: "Email already registered" });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { name, email, passwordHash } });
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiresInSeconds });
    res.status(201).json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email } } });
  } catch (error) { res.status(500).json({ success: false, message: "Registration failed" }); }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ success: false, message: "Invalid credentials" });
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiresInSeconds });
    res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email } } });
  } catch { res.status(500).json({ success: false, message: "Login failed" }); }
});

router.get("/me", auth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId! }, select: { id: true, name: true, email: true } });
  res.json({ success: true, data: user });
});

export default router;
