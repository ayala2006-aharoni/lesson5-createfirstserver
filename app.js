import DB from './DB.js';
const { books} = DB;



import express from 'express';

//crate
const app=express();

//כדי שיצליח לקבל bodyבפוסט נגיד
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // send מחזיר גם מחרוזות וגם טיפוסים שונים
    // res.send('Hello World!')
    res.end("Im so gooddd");
});

app.get('/books', (req, res) => {
    // send מחזיר גם מחרוזות וגם טיפוסים שונים
    // res.send('Hello World!')

    res.json(books);
});

app.get('/books/:id', (req, res) => {
    console.log(req.params); // אוביקט עם פרמטרי חובה
    console.log(req.query); // אוביקט עם פרמטרי רשות

    const p = books.find(x => x.id === +req.params.id);

    // json להחזרת אוביקטים
    res.json(p);
});

app.post('/books', (req, res) => {
    books.push(req.body);

    res.json({
        message: "Book added successfully",
        book: req.body
    });
});


app.patch('/books/:id', (req, res) => {
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

app.patch('/books/:id/:codecust', (req, res) => {
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
app.patch('/books/return/:id', (req, res) => {
    const { id } = req.params;

    const book = books.find(b => b.id == id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.IsBorrow = false;  // עדכון ל־false
    res.json({
        message: "Book returned successfully",
        book
    });
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    const book = books.find(b => b.id == id); // == כי req.params הוא string
    if (!book) return res.status(404).json({ message: "Book not found" });

    // מחיקה מהמערך
    books = books.filter(b => b.id != id);

    res.json({ message: "Book deleted successfully", books });
});


  
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
