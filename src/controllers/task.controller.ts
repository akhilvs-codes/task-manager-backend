
import { Request, Response, NextFunction } from "express";
import Task from "../models/task.model";






export const createTask = async ( req: Request, res: Response,next: NextFunction) => {
    try {
        const { title, description, status } = req.body;

        console.log("create task",title,description,status);
        

        if (!title || !description) {
            return res  .status(400) .json({ message: "Title and description are required" });
        }

        const task = await Task.create({
            title,
            description,
            status: status || "Pending",
            user: req.user!.userId,
        });

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};



export const getTasks = async (  req: Request,  res: Response, next: NextFunction) => {
    try {
        const tasks = await Task.find({ user: req.user!.userId }).sort({
            createdAt: -1,
        });

        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};



export const updateTask = async (  req: Request,  res: Response,  next: NextFunction) => {
    try {
        const { id } = req.params;

        console.log("update tast",id,req.body);
        
        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user!.userId },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};



export const deleteTask = async (  req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { id } = req.params;
        
        console.log("deleting task check working",id);
        const task = await Task.findOneAndDelete({
            _id: id,
            user: req.user!.userId,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};
