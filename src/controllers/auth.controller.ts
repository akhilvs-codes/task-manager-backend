import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import User from "@models/user.model";
import dotenv from "dotenv";
dotenv.config();



export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({ message: "All fields are required" });
        }

        const exists = await User.findOne({ email });

        if (exists) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        return next(error);

    }
}




export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email });

        const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false;

        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        if (user && isPasswordValid) {

            const createToken = (expiresIn: SignOptions["expiresIn"]) => {
                return jwt.sign({
                    userId: user._id,
                    email: user.email
                }, process.env.JWT_SECRET as string, {
                    expiresIn
                })
            }
            const accessToken = createToken("1h");
            const refreshToken = createToken("7d");

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000
            })
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })


            return res.status(200).json({ message: "Login successful" });
        }
      
    } catch (error) {
        return next(error)

    }
}