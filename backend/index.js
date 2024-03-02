import express from "express";
import chats from "./data/dummydata.js";
import cors from 'cors'
import { config } from "dotenv"
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js"



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


app.get('/api/chat', (req, res) => {
    res.send(chats);
})
// app.get('/api/chat/:id', (req, res) => {
//     const id = req.params.id;
//     const singlechat = chats.find((c) => c._id === id);
//     res.send(singlechat);
// })








const port = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${port}.`)
})