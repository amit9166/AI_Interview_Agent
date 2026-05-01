import mongoose from "mongoose";

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected");
    } catch (error) {
        console.log(`Database Error ${error}`);
    }
}
export default connectDb;