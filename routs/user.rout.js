
import { Router } from "express";
import DB from '../DB.js';
import { signUpUser,login,getalluser } from "../controllers/user.controller.js";
const {users} = DB;

const router = Router();

router.get('/', getalluser)

router.post('/sign-up',signUpUser)
  
router.post('/sign-in',login)
   
export default router;