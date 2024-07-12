import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    publishYear:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    stock:{
        type: String,
        require: true
    },
    price:{
        type: String,
        required: true
    }
})

export const Book = mongoose.model("Book", bookSchema);