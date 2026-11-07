import express from "express";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "./controllers/books.js";
import { getAllAuthors, getAuthor, updateAuthor, postAuthor, deleteAuthor } from "./controllers/authors.js";


const router = express.Router();


// Book routes
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
router.get("/books", getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *  get:
 *    summary: Retrieve a book by its ID
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve, such as b1
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error - Unable to retrieve book
 */
router.get("/books/:id", getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *              - id
 *              - title
 *              - authorId
 *              - publicationYear
 *             properties:
 *              - id:
 *                type: string
 *              - title:
 *                type: string
 *              - authorId:
 *                type: string
 *              - publicationDate:
 *                type: string
 *           example:
 *            id: b1
 *            title: The Hobbit
 *            publicationDate: 1937-09-21
 *            authorId: a5
 *     responses:
 *      201:
 *       description: Book created
 *      400:
 *       description: Invalid/Missing required book fields, author does not exist or book ID already exists
 *      500:
 *       description: Unable to create author
 */
router.post("/books", createBook);



/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *              - title
 *              - authorId
 *              - publicationYear
 *             properties:
 *              - title:
 *                type: string
 *              - authorId:
 *                type: string
 *              - publicationDate:
 *                type: string
 *           example:
 *            title: The Hobbit
 *            publicationDate: 1937-09-21
 *            authorId: a5
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Missing required author fields
 *       500:
 *         description: Unable to update book
 */
router.put("/books/:id", updateBook);


/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to delete, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       203:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error - Unable to delete book
 */
router.delete("/books/:id", deleteBook);

//author routes

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */
router.get("/authors", getAllAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     responses:
 *       200:
 *         description: A single author
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to retrieve author
 */
router.get("/authors/:id", getAuthor);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create an author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - firstName
 *               - lastName
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               middleInitial:
 *                 type: string
 *               birthYear:
 *                 type: number
 *           example:
 *             id: a4
 *             firstName: Example FirstName
 *             middleInitial: E
 *             lastName: Example LastName
 *             birthYear: 1980
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Missing required author fields or author ID already exists
 *       500:
 *         description: Unable to create author
 */
router.post("/authors", postAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               middleInitial:
 *                 type: string
 *               birthYear:
 *                 type: number
 *           example:
 *             firstName: Updated FirstName
 *             middleInitial: U
 *             lastName: Updated LastName
 *             birthYear: 1990
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Missing required author fields
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update author
 */
router.put("/authors/:id", updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author has books associated with them. Cannot delete author.  
 *       500:
 *         description: Unable to delete author
 */
router.delete("/authors/:id", deleteAuthor);


export default router;