import express from "express";
import chats from "./data/dummydata.js";


const app = express();





app.get('/', (req, res) => {
    res.send("API RUNNING");
})
app.get('/api/chat', (req, res) => {
    res.send(chats);
})
app.get('/api/chat/:id', (req, res) => {
    const id = req.params.id;
    const singlechat = chats.find((c) => c._id === id);
    res.send(singlechat);
})








const port = 4000;
app.listen(4000, () => {
    console.log(`server running on port ${port}.`)
})