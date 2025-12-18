


import { error } from "node:console"
import app from "./app"
import dotenv from "dotenv"
import connectDB from "../confiq/db"
dotenv.config()

const PORT = process.env.PORT || 8000

connectDB();

const server = app.listen(PORT, () => {
    console.log("server is running");

})

server.on("error", (error) => {

    console.log("server startup error", error);

})

