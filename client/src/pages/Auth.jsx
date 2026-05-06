import React from "react";
import { BsRobot } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import api from "../utils/api";
export default function Auth({isModel=false}){
    const dispatch=useDispatch();
    async function handleGoogleAuth(){
        try {
            const response=await signInWithPopup(auth,provider);
            const user=response.user;
            const name=user.displayName;
            const email=user.email;
            const  result=await api.post("/auth/google",{name,email});
            // console.log(result.data);
            dispatch(setUserData(result.data));
        } catch (error) {
            console.log(error);
            dispatch(setUserData(null));
        }
    }
    return(
        <>
        <div className=
        {`w-full ${isModel? "py-4" : "min-h-screen bg-[#f3f3f3] flex justify-center items-center px-6 py-20"}`}>
            <motion.div 
            initial={{opacity:0 ,y:-50}}
            animate={{opacity:1 , y:0}}
            transition={{duration:1.05}}
            className="w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="bg-black text-white p-2 rounded-lg">
                        <BsRobot/>
                    </div>
                    <h2 className="font-semibold text-lg">InterviewIQ.AI</h2>
                </div>
                <div>
                    <h1 className="text-center text-2xl md:text-3xl font-semibold">Continue with</h1>
                </div>
                <div className=" m-1 flex justify-center items-center bg-green-100 rounded-full gap-2 p-2.5 pb-3">
                    <HiSparkles className="text-green-600 size-6"/>
                    <h2 className=" text-green-600 text-3xl font-semibold">AI Smart Interview</h2>
                </div>
                <p className="text-gray-500 text-center my-4 text-sm md:text-base">
                    Sign in to start AI-powered mock interviews,
                    track your progress, and unlock detailed performance insights.
                </p>
                <motion.button 
                whileHover={{opacity:0.9 ,scale:1.05}}
                whileTap={{opacity:1, scale:0.95}}
                onClick={handleGoogleAuth}
                className="bg-black text-white rounded-full w-full flex justify-center items-center p-3 gap-5">
                    <FcGoogle className="size-6"/> Continue with Google
                </motion.button>
                
            </motion.div>
        </div>
        </>
    )
}
