import { catchAsyncErrors } from "../middleware/catchError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { Book } from "../models/bookSchema.js";

export const addBook = catchAsyncErrors(async (req, res, next) => {
  const { title, author, publishYear, stock, price } = req.body;
  if (!title || !author || !publishYear || !stock || !price) {
    return next(new ErrorHandler("Please add full details", 400));
  }

  let book = await Book.findOne({ title });
  if (book) {
    return next(new ErrorHandler("Book with same title already exists", 400));
  }
  book = await Book.create({ title, author, publishYear, stock, price});
  res.json({
    success: true,
    message: "Book Created Successfully",
  });
});

export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find();
  res.json({
    success: true,
    books,
  });
});

export const getOneBook = catchAsyncErrors(async (request, response) => {
  try {
    const { id } = request.body;
    const book = await Book.findById(id);
    if (!book) {
      response.status(400).json({
        success: false,
        message: "No book with the id exists",
      });
    }
    return response.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.log(error);
  }
});

export const removeBook = async (req, res) => {
  try {
    const book = await Book.findById(req.body.id);
    if (!book) {
      return res.status(400).json({
        success: "false",
        message: "No book exists with the id",
      });
    }
    await Book.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Book removed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export const editBook = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.stock ||
      !req.body.price
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide Full Details",
      });
    } else {
      await Book.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        author: req.body.author,
        stock: req.body.stock,
        publishYear: req.body.publishYear,
        price: req.body.price
      });
      res.json({
        success: true,
        message: "Book Details updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};
