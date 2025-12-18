


import express from "express"
import cors from "cors"
import authRoute from "@routes/auth.routes"
import {errorHandler} from "@middlewares/error.middleware"
import taskRoute from "@routes/task.routes"
import cookieParser from "cookie-parser"



const app=express()

app.use(cookieParser())

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())

app.use("/api/auth",authRoute)

app.use("/api/task",taskRoute)


app.use(errorHandler)



export default app

