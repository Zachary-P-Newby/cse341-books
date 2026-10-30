import { getAllBooks } from "../models/books.js";

export async function getBooksHandler(req, res){
    try{
        const books = await getAllBooks();
        return res.status(200).json(books);
    }catch(error){
        console.log("getBooksHandler - Error occurred: ", error.message);
        return res.status(500).json({ message: "Server Error - Failed to get books."});
    }
}