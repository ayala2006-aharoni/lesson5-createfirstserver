
import booksRouter from './routs/books.rout.js';
import usersRouter from './routs/user.rout.js';




import express from 'express';
//create
const app=express();

//כדי שיצליח לקבל bodyבפוסט נגיד
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // send מחזיר גם מחרוזות וגם טיפוסים שונים
    // res.send('Hello World!')
    res.end("Im so gooddd");
});

app.use('/books', booksRouter);
app.use('/users',usersRouter)


  
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
