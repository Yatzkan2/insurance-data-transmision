import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { sendSqs } from './utils.js' 
import morgan from 'morgan'

if(process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()

const PORT = process.env.PORT

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
    //console.log(data);
    try {
        await sendSqs(process.env.QUEUE_URL, data);
        res.status(200).json({ message: 'Message sent successfully' });
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