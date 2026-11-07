import { getDb } from "../db/connect.js";

export async function getAllBooks(){
    const db = getDb();
    const collection = db.collection('books');
    const books = await collection.find({}).toArray();
    return books;
}

export async function getBookById(bookId){
    const db = getDb();
    const collection = db.collection('books');
    const book = await collection.findOne({id: bookId});
    return book;
}

export async function createBook(bookData){
    const db = getDb();
    const collection = db.collection('books');
    await collection.insertOne(bookData);
}

export async function updateBook(bookId, bookData){
    const db = getDb();
    const collection = db.collection('books');
    await collection.updateOne({id: bookId}, {$set: bookData});
}

export async function deleteBook(bookId){
    const db = getDb();
    const collection = db.collection('books');
    await collection.deleteOne({id: bookId});
}