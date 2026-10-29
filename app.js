import express from "express";
import path from "path";
import { fileURLToPath } from "url";



const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.route("/").get((req, res) => {
    
    return res.status(200).json({ message: 'Server is running' });

});

export default app;