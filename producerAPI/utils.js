import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

export const sendSqs = async (url, data) => {
    if(!data.body) {
        throw Error('Meassage is empty')
    }
    const msg = convertToMessageAttributes(data.body);
    const client = new SQSClient({}); 
    const input = {
        QueueUrl: url,
        MessageAttributes: {
            ...msg
        },
        MessageBody: "Insurance details",
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

const convertToMessageAttributes = (obj) => {
    console.log("convertToMessageAttributes called with")
    console.log(obj)

    const attributes = {};
    
    for (const [key, value] of Object.entries(obj)) {
        let attribute;
        
        switch (typeof value) {
            case 'number':
                attribute = {
                    DataType: 'Number',
                    StringValue: value.toString()
                };
                break;
            
            case 'boolean':
                attribute = {
                    DataType: 'String.Boolean',
                    StringValue: value.toString()
                };
                break;
                
            case 'object':
                if (value === null) {
                    attribute = {
                        DataType: 'String',
                        StringValue: 'null'
                    };
                } else if (Array.isArray(value)) {
                    attribute = {
                        DataType: 'String.Array',
                        StringValue: JSON.stringify(value)
                    };
                } else if (value instanceof Date) {
                    attribute = {
                        DataType: 'String.Timestamp',
                        StringValue: value.toISOString()
                    };
                } else {
                    attribute = {
                        DataType: 'String.Object',
                        StringValue: JSON.stringify(value)
                    };
                }
                break;
                
            default:
                attribute = {
                    DataType: 'String',
                    StringValue: value.toString()
                };
        }
        
        attributes[key] = attribute;
    }
    console.log("the attribute is: ")
    console.log(attributes)
    return attributes;
};