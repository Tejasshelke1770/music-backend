import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log("connected to DB!")
    } catch (error) {
        console.log("Database Error", error)
    }
}

export default connectDB;