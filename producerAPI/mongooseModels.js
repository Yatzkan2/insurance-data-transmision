import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    ownerFirstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    ownerLastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    id: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: v => /^\d{9}$/.test(v),
            message: "ID must contain only digits",
        }
    },
    insuranceLimit: {
        type: Number,
        required: true,
        min: 1,
    },
    insuranceCoverage: {
        type: Number,
        required: true,
        min: 1,
    },
    insurancePremium: {
        type: Number,
        required: true,
        min: 1,
    },
    type: {
        type: String,
        required: true,
    },
    sentTimeStamp: {
        type: Number,
        required: true,
    }
})

const Message = new mongoose.model("Message", messageSchema);

export {
    Message,
}
