import {Router} from "express"

import {createTask, getTasks,updateTask } from "@controllers/task.controller"

import { authMiddleware } from "@middlewares/auth.middleware";

const router=Router()



router.get("/",authMiddleware, getTasks)

router.post("/",authMiddleware, createTask)

router.patch("/:id",authMiddleware, updateTask)

router.delete("/:id",authMiddleware, updateTask)


export default router



