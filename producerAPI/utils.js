import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const config = {
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
};

export const sendSqs = async (url, data) => {
    const client = new SQSClient({});  // AWS config should be here
    const input = {
        QueueUrl: url,
        MessageBody: JSON.stringify(data),
        MessageGroupId: "0",
    };
    const command = new SendMessageCommand(input);
    try {
        const response = await client.send(command);
        console.log("GREAT SUCCESS!");
        return response;
    } catch (error) {
        throw error;
    }
}