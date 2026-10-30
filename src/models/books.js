import { getDb } from "../db/connect.js";

export async function getAllBooks(){
    const db = getDb();
    const collection = db.collection('books');
    const books = await collection.find({}).toArray();
    return books;
}