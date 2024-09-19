import mongoose from "mongoose";

const url = process.env.MONGO_DB;
const connectToDB = async () => {
    try {
        mongoose.connect(url);
        console.log("MongoDB is connected")
    } catch (err) {
        console.log("Failed to connect MongoDB")
    }
};

export default connectToDB;