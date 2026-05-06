
import jwt from "jsonwebtoken";
 

export default async function isAuth(req,res,next){
    try {
        const authHeader=req.headers.authorization || "";
        const bearerToken=authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        const {token:cookieToken}=req.cookies;
        const token=bearerToken || cookieToken;
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
