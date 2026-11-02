import express from "express";
import { getBooksHandler, getBookbyIdHandler } from "./controllers/books.js";

const router = express.Router();


// GET routes
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books returned successfully
 *       500:
 *         description: Internal server error
 */
router.get("/books", getBooksHandler);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error - Unable to retrieve book
 */
router.get("/books/:id", getBookbyIdHandler);


/*
//Testing Route template used for checking if the route and controller functions send the correct response status codes and content type
//Based research on how to check status code and content type on Duck.ai

router.get(" ", async (req, res, next)=>{
    try {
    await getBookbyIdHandler(req, res);
    const contentType = res.get("Content-Type") || "";
    const isJson = contentType.toLowerCase().startsWith("application/json");

    console.log({ statusCode: res.statusCode, isJson });
  } catch (err) {
    next(err);
  }

});


*/


export default router;