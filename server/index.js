import express from "express";
import dotenv from "dotenv";   
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";
//always use file path with extensions in node js 
dotenv.config();
const app=express();
// app.get("/",(req,res)=>{
    //     return res.json({message:"server started"})
    // })
    app.set("trust proxy", 1); // trust first proxy
    const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
        .split(",")
        .map((origin)=>origin.trim())
        .filter(Boolean);
    const defaultAllowedOrigins = [
        "https://ai-interview-agent-client-fbz0.onrender.com",
    ];

    app.use(cors({
        origin(origin, callback){
            const isAllowed =
                !origin ||
                allowedOrigins.includes(origin) ||
                defaultAllowedOrigins.includes(origin) ||
                origin.startsWith("http://localhost:") ||
                origin.startsWith("http://127.0.0.1:");

            if(isAllowed){
                return callback(null, true);
            }
            return callback(new Error(`CORS blocked origin: ${origin}`));
        },
        credentials:true
    }))
    app.use(express.json());
    app.use(cookieParser())


app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/interview",interviewRouter);
app.use("/api/payment",paymentRouter);

const PORT=process.env.PORT || 6000;
app.listen(PORT,()=>{
    console.log("server is running on port "+PORT)
    connectDb();
})
