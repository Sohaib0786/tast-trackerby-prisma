import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createTask, getTasks, toggleTask } from "../controllers/task.controller";

const router = Router();

router.use(authenticate);

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id/toggle", toggleTask);

export default router;
