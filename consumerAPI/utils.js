import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

export const pollSqs = async (url) => {
  try {

    const client = new SQSClient({});
    const input = {
      QueueUrl: url,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
      MessageAttributeNames: ["All"],
      MessageSystemAttributeNames: ["All",]
    };
    const command = new ReceiveMessageCommand(input);
    const response = await client.send(command);

    if (!response.Messages || response.Messages.length === 0) {
      console.log("No messages received from queue");
      return [];
    }
    console.log("@@@@@@@@@@@@@ POLL FUNCTION RESPONSE @@@@@@@@@@@@@")
    console.log(response)

    const messages = response.Messages;

    console.log("@@@@@@@@@@@@@ POLL FUNCTION MESSAGES @@@@@@@@@@@@@")
    console.log(messages)

    const convertedData = messageAttributesToObjects(messages)

    console.log("@@@@@@@@@@@@@ POLL FUNCTION CONVERTED DATA @@@@@@@@@@@@@")
    console.log(messages)

    return convertedData;
  } catch (error) {
    console.error(error)
    throw error; 
  }}



const messageAttributesToObjects = messagesArray => {
  if (!messagesArray) {
    console.warn('Warning: messagesArray is undefined or null');
    return [];
  }
  return messagesArray.map((msgObject, index) => {
    const sentTimestamp = Number(msgObject.Attributes.SentTimestamp);
    const messageId = msgObject.MessageId;
    const receiptHandle = msgObject.ReceiptHandle;

    const messageAttributeEntries = Object.entries(msgObject.MessageAttributes).map(([key, value]) => {
      return [key, (value.DataType === 'Number') ?  Number(value.StringValue) : value.StringValue];
    })
    messageAttributeEntries.push(["sentTimeStamp", sentTimestamp])
    messageAttributeEntries.push(["messageId", messageId])
    messageAttributeEntries.push(["receiptHandle", receiptHandle])

    return Object.fromEntries(messageAttributeEntries)
  })
}

export const deleteSqsMessages = async (url, messages) => {
  const responses = [];
  const client = new SQSClient({});
    for(const msg of messages) {
      const input = { // DeleteMessageRequest
        QueueUrl: url, // required
        ReceiptHandle: msg.receiptHandle, // required
      };
      console.log(`!!!!!!!!!! trying to delete: ${msg.receiptHandle}`)
      try{
        const command = new DeleteMessageCommand(input);
        const response = await client.send(command);
        responses.push(response);
      } catch (error) {
        console.error(`failed deleting messages from sqs: ${error}`)
      }
    }
    return responses;
}



