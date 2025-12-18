
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try {

        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if (accessToken) {
            const decodedAccessData = jwt.verify(accessToken, process.env.JWT_SECRET as string);

            req.user = decodedAccessData;

            return next();
        }
        if (refreshToken) {
            const decodedRefreshData = jwt.verify(refreshToken, process.env.JWT_SECRET as string);

            const newAccessToken = jwt.sign({
                userId: (decodedRefreshData as any).userId,
                email: (decodedRefreshData as any).email
            }, process.env.JWT_SECRET as string, {
                expiresIn: "1h"
            });


            req.user = decodedRefreshData;

             res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000
            })
            return next();
        }


        if (!accessToken || !refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}