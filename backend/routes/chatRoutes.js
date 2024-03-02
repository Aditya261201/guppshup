import express from "express"
import { protect } from "../middlewares/authMiddleware.js";
import { accessChats, fetchChats, createGroupChat, renameGroup, removeFromGroup , addToGroup } from "../controllers/chat.js"


const router = express.Router();


router.get('/',protect,fetchChats);
router.post('/',protect,accessChats);
router.post('/group',protect,createGroupChat);
router.put('/rename',protect,renameGroup);
router.put('/removegroup',protect,removeFromGroup);
router.put('/groupadd',protect,addToGroup);


export default router;