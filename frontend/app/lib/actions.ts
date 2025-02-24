import axios from "axios";
import { fakeMessages } from "./data";
const producerServiceUrl:string = process.env.NEXT_PUBLIC_PRODUCER_API_URL || "http://localhost:3001";
const consumerServiceUrl:string = process.env.NEXT_PUBLIC_CONSUMER_API_URL || "http://localhost:3002";


import { InsuranceDetailsInputs } from "./definitions";

const fetchMessageHistory = async () => {
    try {
        const response = await axios.get(`${consumerServiceUrl}/insurance/messages`);
        //console.log(Array.isArray(response.data.messages));
        const messages = response.data.messages;
        const data = messages.map(({_id, sentTimeStamp, __v, ...rest}:InsuranceDetailsInputs & {_id: string, sentTimeStamp: number, __v:number}, index:number) => {
            const timeStampDate = new Date(sentTimeStamp).toLocaleString('en-US',{hour12: false});  
            return {...rest, sentTimeStamp:timeStampDate}
        })
        // console.log("########## DATA #########")
        // console.log(Array.isArray(data))
        return data;
    } catch (error) {
        console.error(`clilent failed fatching the messages ${error}`);
    }
}

const submitForm = async (data:InsuranceDetailsInputs | undefined | any)=> {
    if(!data) {
        throw new Error("Error occured while submitting the insurance details form");
    }
    //throw new Error("EXAMPLE ERROR")
    try {
        console.log("Sending details to sqs");
        const response = await axios.post(`${producerServiceUrl}/insurance/send`, {
            body: data
        });
        console.log("RESPONSE FROM PRODUCER:")
        console.log(response);
    } catch (error) {
        console.error(error)
    }
}

const pollSqsAndPushToDB = async () => {
    try {
        const response = await axios.post(`${consumerServiceUrl}/insurance/poll`);

    } catch (error) {
        console.error(error)
    }
}
export {
    submitForm,
    fetchMessageHistory,
    pollSqsAndPushToDB,
}