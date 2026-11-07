import { getAllAuthors as getAllAuthorsFromDb, getAuthorById, createAuthor, updateAuthor as updateAuthorInDb, deleteAuthor as deleteAuthorFromDb, authorHasBooks } from "../models/authors.js";

const getAllAuthors = async (req, res) => {
    try{
        const authors = await getAllAuthorsFromDb();
        return res.status(200).json(authors);
    } catch(error) {
        return res.status(500).json({message: 'Unable to retrieve authors.'})
    }
};

const getAuthor = async (req, res) => {
    
    const id = req.params.id;
    try{
        const author = await getAuthorById(id);
        
        if(author == null){
            return res.status(404).json({message: "Author not Found"});
        }
        return res.status(200).json(author);

    } catch(error) {
        return res.status(500).json({message: 'Unable to retrieve author.'})
    }
};


const postAuthor = async (req, res) => {
    
    const {id, firstName, lastName, birthYear} = req.body;
    let middleInitial = req.body.middleInitial;

    //input validation - made using github copilot inline suggestion
    
    if(!id || !firstName || !lastName || !birthYear){
        return res.status(400).json({message: "Missing required author data"});
    }

    if(!middleInitial){
        middleInitial = "";
    }

    try{
        const prexistingAuthor = await getAuthorById(id);
        if(prexistingAuthor != null){
            return res.status(400).json({message: "Id already in use"});
        }
    }catch(error){
        return res.status(500).json({message: 'Unable to create new author.'})
    }
    
    try{
        await createAuthor({id, firstName, middleInitial, lastName, birthYear});
        return res.status(201).json({message: 'Successfully Created New Author'});
    } catch(error) {
        return res.status(500).json({message: 'Unable to create new author.'})
    }
};


const updateAuthor = async (req, res) => {

    const id = req.params.id;
    const {firstName, lastName, birthYear} = req.body;
    let middleInitial = req.body.middleInitial;

    if(!id || !firstName || !lastName || !birthYear){
        return res.status(400).json({message: "Missing required author data"});
    }
    
    if(!middleInitial){
        middleInitial = "";
    }

    try{
        await updateAuthorInDb(id, {firstName, middleInitial, lastName, birthYear});
        return res.status(200).json({message: 'Author updated successfully'});
    } catch(error) {
        return res.status(500).json({message: 'Unable to update author.'})
    }
};

const deleteAuthor = async (req, res) => {
    const id = req.params.id;

    const hasBooks = await authorHasBooks(id);
    if(hasBooks){
        return res.status(409).json({message: 'Author has books associated with them. Cannot delete author.'});
    }

    const author = await getAuthorById(id);
    if(author == null){
        return res.status(404).json({message: 'Author not found'});
    }

    try{
        await deleteAuthorFromDb(id);
        return res.status(200).json({message: 'Author deleted successfully'});
    } catch(error) {
        return res.status(500).json({message: 'Unable to delete author.'})
    }
};


export {getAllAuthors, getAuthor, postAuthor, updateAuthor, deleteAuthor}