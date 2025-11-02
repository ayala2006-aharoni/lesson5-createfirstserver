import { Router } from "express";
import DB from '../DB.js';
const {books,users} = DB;
import {getbookbyid,addbook,updatebook,takebook,backbook,deletebook,getallbooksby}  from "../controllers/book.controller.js";




// הראוטר יכיל את כל הניתובים ששייכים למשאב מסוים
// resource - משאב
// URL - מושפע משם המשאב בד"כ ברבים
// http://localhost:3000/products
const router = Router();

// route עם query param (אופציונלי)

//זה הוא מחליט אם לשים מחיר או לא וכן שם 
router.get('/', getallbooksby)


router.get('/:id', getbookbyid);


router.post('/', addbook)
  

router.patch('/:id', updatebook)

//עדכון של מה שלא אותו דבר כמו שהכנסתי
//השאלת ספר
router.patch('/:id/:codecust',takebook)

 //החזרת ספר
router.patch('/return/:id/:userId', backbook)


router.delete('/:id',deletebook)
 
export default router;