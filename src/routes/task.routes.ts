import {Router} from "express"

import {getAllTasks} from "@controllers/task.controller"

import { authMiddleware } from "@middlewares/auth.middleware";

const router=Router()



router.get("/tasks",authMiddleware, getAllTasks)

export default router



