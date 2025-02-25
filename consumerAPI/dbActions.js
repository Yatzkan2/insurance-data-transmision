import mongoose from "mongoose";
import { Message } from "./mongooseModels.js";

export const insertMessages = async (messages) => {
    console.log(`insertMessages fundtion`)
    const messagesModelArray = messages.map((msg, index) => {
        return new Message(msg);
    })
    try {
        const res = await Message.insertMany(messagesModelArray);
        return res;
    } catch (error) {
        console.error(`failed inserting to DB, ${error}`);
        throw Error(error)
    }
}

export const fetchAllMessages = async () => {
    try {
        return await Message.find({})
    } catch (error) {
        console.error(`falied fetching the data from the DB: ${error}`)
    }
}