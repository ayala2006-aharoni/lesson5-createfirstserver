
import booksRouter from './routs/books.rout.js';
import usersRouter from './routs/user.rout.js';
import { config } from 'dotenv';
import { Addreqdate, printdateforget } from './middlewares/adddate.middlewares.js';
import {notFoundHandler,generalErrorHandler} from './middlewares/errHandler.js'

// .env-קורא את כל קבצי ה
// process.env ומכניס את הערכים כאוביקט לתוך
config();





import express from 'express';
//create
const app=express();

app.use(Addreqdate);
app.use(printdateforget);




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

app.use(notFoundHandler);
app.use(generalErrorHandler);


  
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
