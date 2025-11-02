import { Router } from "express";
import DB from '../DB.js';
const {books} = DB;


// הראוטר יכיל את כל הניתובים ששייכים למשאב מסוים
// resource - משאב
// URL - מושפע משם המשאב בד"כ ברבים
// http://localhost:3000/products
const router = Router();



// route עם query param (אופציונלי)

//זה הוא מחליט אם לשים מחיר או לא וכן שם 
router.get('/', (req, res) => {
    const { name, price } = req.query;
    let result = books;
  
    if (name) result = result.filter(b => b.name === name);
    if (price) result = result.filter(b => b.price <= +price);
  
    res.json(result);
  });
  

router.get('/:id', (req, res) => {
    console.log(req.params); // אוביקט עם פרמטרי חובה
    console.log(req.query); // אוביקט עם פרמטרי רשות

    //+ זה בשביל ההמרה למספר
    const p = books.find(x => x.id === +req.params.id);

    // json להחזרת אוביקטים
    res.json(p);
});

router.post('/', (req, res) => {
    books.push(req.body);

    res.json({
        message: "Book added successfully",
        book: req.body
    });
});


router.patch('/:id', (req, res) => {
    const id = +req.params.id; // קוד הספר שמגיע מה־URL
    const book = books.find(b => b.id === id);
    if (!book)
      return res.status(404).json({ message: "Book not found" });
    // מפרידים את השדות שאסור לעדכן
    const { IsBorrow, BorrowDate, ...allowedFields } = req.body;
    // מעדכנים רק את המותר
    Object.assign(book, allowedFields);
    res.json({
      message: "Book updated successfully",
      updatedBook: book
    });
  });
  

//עדכון של מה שלא אותו דבר כמו שהכנסתי

router.patch('/:id/:codecust', (req, res) => {
    const { id, codecust } = req.params;

    // חפש את הספר לפי id
    const book = books.find(b => b.id == id); // == כי req.params הוא string
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // בדיקה אם הספר פנוי
    if (!book.IsBorrow) {
        book.IsBorrow = true; // עדכון סטטוס מושאל

        // וודא שיש מערך borrows והוסף את המשתמש
        if (!book.borrows) book.borrows = [];
        book.borrows.push(+codecust);

        res.json({
            message: "Book borrowed successfully",
            book
        });
    } else {
        res.status(400).json({ message: "Book already borrowed" });
    }
});
router.patch('/return/:id', (req, res) => {
    const { id } = req.params;

    const book = books.find(b => b.id == id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.IsBorrow = false;  // עדכון ל־false
    res.json({
        message: "Book returned successfully",
        book
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const book = books.find(b => b.id == id); // == כי req.params הוא string
    if (!book) return res.status(404).json({ message: "Book not found" });

    // מחיקה מהמערך
    books = books.filter(b => b.id != id);

    res.json({ message: "Book deleted successfully", books });
});

export default router;