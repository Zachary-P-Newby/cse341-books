import { getAllBooks as getAllBooksFromDb, getBookById as getBookByIdFromDb, createBook as createBookInDb, updateBook as updateBookInDb, deleteBook as deleteBookFromDb } from "../models/books.js";
import {getAuthorById} from "../models/authors.js";

export async function getAllBooks(req, res){
    try{
        const books = await getAllBooksFromDb();
        return res.status(200).json(books);
    }catch(error){
        console.log("getBooksHandler - Error occurred: ", error.message);
        return res.status(500).json({ message: "Internal Server Error - Failed to get books."});
    }
}

export async function getBookById(req, res){
    try{
        const id = req.params.id;
        const book = await getBookByIdFromDb(id);

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

export async function createBook(req, res){

    const { id, title, authorId, publicationDate } = req.body;

    const prexistingBook = await getBookByIdFromDb(id);
    if(prexistingBook != null){
        return res.status(400).json({message: "Id already in use"})
    }
    
    if(!id || !title || !authorId || !publicationDate){
        return res.status(400).json({ message: "Bad Request - Missing required fields" });
    }

    const author = await getAuthorById(authorId);
    if(!author){
        return res.status(400).json({ message: "Bad Request - Author with the provided authorId does not exist" });
    }

    try{
        await createBookInDb({ id, title, authorId, publicationDate });
        return res.status(201).json({ message: "Book created successfully" });
    }catch(error){
        console.log("Error: ", error.message);
        return res.status(500).json({ message: "Internal Server Error - Failed to create book" });
    }
}

export async function updateBook(req, res){
    const id = req.params.id;
    const { title, authorId, publicationDate } = req.body;

    if(!title || !authorId || !publicationDate){
        return res.status(400).json({ message: "Bad Request - Missing required fields" });
    }

    const book = await getBookByIdFromDb(id);
    if(!book){
        return res.status(404).json({message: "Book not found"})
    }

    const author = await getAuthorById(authorId);
    if(!author){
        return res.status(400).json({ message: "Bad Request - Author with the provided authorId does not exist" });
    }

    try{
        await updateBookInDb(id, { title, authorId, publicationDate });
        return res.status(200).json({ message: "Book updated successfully" });
    }catch(error){
        console.log("Error: ", error.message);
        return res.status(500).json({ message: "Internal Server Error - Failed to update book" });
    }
}

export async function deleteBook(req, res){
    const id = req.params.id;

    const book = await getBookByIdFromDb(id);
    if(!book){
        return res.status(404).json({ message: "Book not found" });
    }

    try{
        await deleteBookFromDb(id);
        return res.status(200).json({ message: "Book deleted successfully" });
    }catch(error){
        console.log("Error: ", error.message);
        return res.status(500).json({ message: "Internal Server Error - Failed to delete book" });
    }
}