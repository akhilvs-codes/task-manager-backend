


import { error } from "node:console"
import app from "./app"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 8000


const server = app.listen(PORT, () => {
    console.log("server is running");

})

server.on("error", (error) => {

    console.log("server startup error", error);

})