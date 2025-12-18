





import mongoose, {Schema} from "mongoose"


const  taskSchema=new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})


const taskModel=mongoose.model("Task",taskSchema)

export default taskModel