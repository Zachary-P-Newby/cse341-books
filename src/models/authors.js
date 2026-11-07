import { getDb } from "../db/connect.js";

export async function getAllAuthors() {
    const db = getDb();
    const collection = db.collection('authors');
    const authors = await collection.find({}).toArray();

    return authors;
}

export async function getAuthorById(id) {
    const db = getDb();
    const collection = db.collection('authors');
    const author = await collection.findOne({id:id});

    return author;
}

export async function createAuthor(author) {
    const db = getDb();
    const collection = db.collection('authors');
    const authors = await collection.insertOne(author);
}

export async function updateAuthor(id, author) {
    const db = getDb();
    const collection = db.collection('authors');
    await collection.updateOne({id: id}, {$set: author});
}

export async function deleteAuthor(id) {
    const db = getDb();
    const collection = db.collection('authors');
    const authors = await collection.deleteOne({id:id});
}

export async function authorHasBooks(id) {
    const db = getDb();
    const collection = db.collection('books');
    const books = await collection.find({auhtorId:id}).toArray();
    if(books.length <= 0){
        return true;
    }
    else{
        return false
    }
}