
import jwt from "jsonwebtoken";
 

export default async function isAuth(req,res,next){
    try {
        const {token}=req.cookies;
        // console.log("Cookies:", req.cookies);
        if(!token){
            return res.status(400).json({message:"user does not have a token"});
        }
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
        // console.log("TOKEN DATA:", verifyToken);
        req.userId=verifyToken.userId;
        // console.log("Authenticated user ID:", req.userId);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:`isAuth error ${error}`});
    }


}