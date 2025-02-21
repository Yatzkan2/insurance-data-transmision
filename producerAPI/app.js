import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { sendSqs } from './utils.js'  // Note the .js extension

if(process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()
const port = 3001

app.use(cors({
    origin: "*",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
}));

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/insurance/send', async (req, res) => {
    console.log('insurance/send route post')
    const data = req.body;
    console.log(data);
    try {
        await sendSqs(process.env.QUEUE_URL, data);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error("something went wrong with enquing sqs", error);
        res.status(500).json({ error: 'Failed to send message' });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})