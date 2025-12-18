


import express from "express"
import cors from "cors"
import authRoute from "@routes/auth.routes"



const app=express()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())

app.use("/api/auth",authRoute)



export default app

