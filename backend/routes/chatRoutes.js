import express from "express"
import { protect } from "../middlewares/authMiddleware.js";
import {accessChats} from "../controllers/chat.js"


const router = express.Router();


// router.get('/',protect,fetchChats);
router.post('/',protect,accessChats);
// router.post('/group',protect,createGroup);
// router.put('/rename',protect,renameGroup);
// router.put('/removegroup',protect,removeFromGroup);
// router.put('/groupadd',protect,addToGroup);


export default router;