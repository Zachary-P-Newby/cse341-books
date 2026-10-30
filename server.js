import app from "./app.js";
import { connectToDb} from "./src/db/connect.js";

const PORT = process.env.PORT;
if(!PORT) {
    console.error("PORT is not defined in the environment variables.");
    process.exit(1);
}

async function starServer(){
    try{
        await connectToDb();

        app.listen(PORT, () => {
            console.log(`Server listening at http://127.0.0.1:${PORT}`)
            });
    } catch(err){
        console.log(`Database Connection Failure: ${err.message}`);
        process.exit(1);
    }
    
    
    
}

starServer();