import express from "express";
import { getBooksHandler, getBookbyIdHandler } from "./controllers/books.js";

const router = express.Router();


//GET routes
router.get("/books", getBooksHandler);
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