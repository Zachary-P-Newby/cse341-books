import { getAllBooks, getBookById } from "../models/books.js";

export async function getBooksHandler(req, res){
    try{
        const books = await getAllBooks();
        return res.status(200).json(books);
    }catch(error){
        console.log("getBooksHandler - Error occurred: ", error.message);
        return res.status(500).json({ message: "Internal Server Error - Failed to get books."});
    }
}

export async function getBookbyIdHandler(req, res){
    try{
        const id = req.params.id;
        const book = await getBookById(id);

        if(book != null){
            return res.status(200).json(book);
        }
        else{
            return res.status(404).json({message: "Book Not Found"});
        }
    }catch(error){
        console.log("Error: ", error.message);
        return res.status(500).json({message: "Interal Server Error - Failed to get book"})
    }
}