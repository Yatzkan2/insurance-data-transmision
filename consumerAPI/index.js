
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { insertMessages, fetchAllMessages } from "./dbActions.js";
import { pollSqs, deleteSqsMessages } from './utils.js';

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.DB_URL).then(
    (data) => { console.log(`Mongo connected succesfully: ${(JSON.stringify(data.connection.host))}`)},
    error => { console.error(`connection to mongo failed: ${error}`) }
  );

app.use(morgan('tiny'));
app.use(cors({
    origin: "*",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
}));
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello from consumer');
})

app.post('/insurance/poll', async (req, res) => {
    try {
        const messages = await pollSqs(process.env.QUEUE_URL);
        console.log('Messages polled succesfully from sqs');
        const dbRes = await insertMessages(messages);
        const deleteResponses = await deleteSqsMessages(process.env.QUEUE_URL, messages)
        res.send({"messages": messages, "db reponse": dbRes, "delete from sqs reponses": deleteResponses});
    } catch (error){
        console.error(error)
        throw Error(error)
    }
})

app.get('/insurance/messages', async (req, res) => {
    try {
        const data = await fetchAllMessages();
        res.send({messages:data});
    } catch {
        console.error(`failed fetching messages ${error}`);
    }
})

app.listen(PORT, () => {
    console.log("##########################################")
    console.log(`########### LISTENING ON ${PORT} ############`)
    console.log("##########################################")

})


