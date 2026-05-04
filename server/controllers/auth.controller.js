import genToken from "../config/token.js";
import User from "../models/user.model.js";

export async function googleAuth(req,res){
    try {
        const{name,email}=req.body;
        let user=await User.findOne({email});
        if(!user){
            user=await User.create({name,email});
        }
        const token=await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "None",
            maxAge:7*24 *60*60*1000,
            path: "/",
        })
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message:`Google auth error ${error}`});
    }
}

export async function logOut(req,res){
    try {
        await res.clearCookie("token");
        return res.status(200).json({message:"logout successfull"})
    } catch (error) {
        return res.status(500).json({message:`Logout error ${error}`});       
    }
}