import express from "express"
import { addBook, editBook, getAllBooks, getOneBook, removeBook } from "../controller/bookController.js"

const bookRouter = express.Router();
bookRouter.post("/addBook", addBook);
bookRouter.get("/getBooks", getAllBooks);
bookRouter.post("/getOneBook", getOneBook);
bookRouter.post("/deleteBook", removeBook);
bookRouter.put("/editBook", editBook);
export default bookRouter;