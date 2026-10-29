import app from "./app.js";

const PORT = process.env.PORT;
if(!PORT) {
    console.error("PORT is not defined in the environment variables.");
    process.exit(1);
}


app.listen(PORT, () => {
    console.log(`Server listening at 127.0.0.1:${PORT}`);
});