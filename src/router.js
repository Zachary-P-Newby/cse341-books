import express from "express";
import { getBooksHandler } from "./controllers/books.js";

const router = express.Router();


//GET routes
router.get("/books", getBooksHandler);

/*
Status Code check version of route - suggested by Duck.ai
router.get("/books", (req, res)=>{
    getBooksHandler(req, res);
    console.log(res.statusCode);
});
*/


export default router;