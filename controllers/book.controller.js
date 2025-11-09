import DB from '../DB.js';
const {books,users} = DB;

export const getallbooksby =(req,res)=>
{
        const { name, price } = req.query;
        let result = books;
        if (name) result = result.filter(b => b.name === name);
        if (price) result = result.filter(b => b.price <= +price);
      
        res.json(result);
      
}

export const getbookbyid =(req,res,next)=>
    {
        console.log(req.params); // אוביקט עם פרמטרי חובה
        console.log(req.query); // אוביקט עם פרמטרי רשות
        //+ זה בשביל ההמרה למספר
        const p = books.find(x => x.id === +req.params.id);
        // json להחזרת אוביקטים
            if (!p) {
                const err = new Error('Book not found');
                err.status = 404;
                next(err); // <- כאן השגיאה תגיע ל-generalErrorHandler
                return;
            }
        res.json(p)
    }
    export const addbook=(req,res)=>
    {
        books.push(req.body);
        res.json({
            message: "Book added successfully",
            book:req.body
        });
    }

    export const  updatebook=(req,res)=>
    {
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
    }

export const takebook= (req,res)=>
{
        const { id, codecust } = req.params;
    
        const book = books.find(b => b.id === Number(id));
        if (!book) return res.status(404).json({ message: "Book not found" });
    
        const user = users.find(x => x.id === Number(codecust));
        if (!user) return res.status(404).json({ message: "User not found" });
        if (!user.books) user.books = [];
    
        if (!book.IsBorrow) {
            book.IsBorrow = true;
            user.books.push(book.id);
    
            if (!book.borrows) book.borrows = [];
            if (!book.borrows.includes(user.id)) book.borrows.push(user.id);
    
            res.json({ message: "Book borrowed successfully", book });
        } else {
            res.status(400).json({ message: "Book already borrowed" });
        }
}
export const backbook= (req,res)=>
{
    const { id, userId } = req.params;
    // מציאת הספר
    const book = books.find(b => b.id == id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // מציאת המשתמש
    const user = users.find(u => u.id == userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // עדכון סטטוס הספר
    book.IsBorrow = false;

    // הסרת הספר ממערך ההשאלות של המשתמש
    user.borrows = user.borrows.filter(borrowedId => borrowedId != id);

    res.json({
        message: "Book returned successfully",
        book,
        user
    });

}


  export  const  deletebook=(req,res)=>
{
        const { id } = req.params;
        const book = books.find(b => b.id == id); // == כי req.params הוא string
        if (!book) return res.status(404).json({ message: "Book not found" });
    
        // מחיקה מהמערך
        books = books.filter(b => b.id != id);
    
        res.json({ message: "Book deleted successfully", books });
 
    
}

    
