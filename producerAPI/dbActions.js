import { Message } from "./mongooseModels.js";

export const checkExistingClient = async (formId) => {
    if(!formId) {
        throw Error("Cannot query the database with undefined");        
    }
    try {
        const foundMessage = await Message.find({id:formId})
        return foundMessage;
    } catch (error) {
        console.error(`failed searching for id in DB: ${error}`)
        throw error;
    }
    
}