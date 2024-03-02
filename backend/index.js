import express from "express";
import chats from "./data/dummydata.js";
import cors from 'cors'
import { config } from "dotenv"
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js"
import chatRouter from "./routes/chatRoutes.js"



const app = express();
app.use(express.json());
config({
    path: "./config.env"
})
connectDB();


app.use(cors());


app.get('/', (req, res) => {
    res.send("API RUNNING");
})

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);









const port = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${port}.`)
})