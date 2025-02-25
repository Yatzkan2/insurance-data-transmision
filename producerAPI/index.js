import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { sendSqs } from './utils.js' 
import morgan from 'morgan'
import mongoose from 'mongoose'
import { checkExistingClient } from './dbActions.js'

if(process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()

const PORT = process.env.PORT

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
    res.send('PRODUCER SERVEIVE!')
})

app.post('/insurance/send', async (req, res) => {
    //console.log('insurance/send route post')
    const data = req.body;
    if(!data) {
        throw Error('message is empty')
    }
    console.log(data);
    try {
        const existResponse = await checkExistingClient(data.body.id);
        console.log(existResponse)
        if (existResponse.length !== 0) {
            res.status(200).json({message: `client with id: ${data.body.id}, already exists`, clientExists: true});
        } else {
            const response = await sendSqs(process.env.QUEUE_URL, data);
            res.status(200).json({ message: 'Message sent successfully', data: response, clientExists: false });
        }
    } catch (error) {
        console.error("something went wrong with enquing sqs", error);
        res.status(500).json({ error: 'Failed to send message' });
    }
})

app.listen(PORT, () => {
    console.log("##########################################")
    console.log(`########### LISTENING ON ${PORT} ############`)
    console.log("##########################################")

})