




import mongoose, { Schema } from "mongoose"



// Temporary User Schema deleted after 5 minutes
// for otp storage during signup process

const temUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, 
    }
})


const temUserModel = mongoose.model("TemUser", temUserSchema)

export default temUserModel