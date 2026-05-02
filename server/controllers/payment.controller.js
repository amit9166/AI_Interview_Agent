import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import razorpay from "../services/razorpay.service.js";
import crypto from "crypto";
export async function createOrder(req,res){
    try {
        const {planId,amount,credits}=req.body;
        if(!amount || !credits){
            return res.status(400).json({message:"Invalid plan data"})
        }

        const options={
            amount:amount*100, //convert to paise
            currency:"INR",
            receipt:`receipt_${Date.now()}`,
        };

        const order= await razorpay.orders.create(options);
        await Payment.create({
            userId:req.userId,
            planId,
            amount,
            credits,
            razorpayOrderId:order.id,
            status:"created"
        });
        return res.json(order);
    } catch (error) {
        return res.status(500).json({message:`failed to create Razorpay order ${error}`})   
    }
}

export async function verifyPayment(req,res){
//     console.log("VERIFY HIT");
// console.log("BODY:", req.body);
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
        const body=razorpay_order_id+"|"+razorpay_payment_id;
        // console.log("SECRET:", process.env.REZORPAY_KEY_SECRET);
        const expectedSignature= crypto.createHmac("sha256",process.env.REZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

        // console.log("EXPECTED:", expectedSignature);
// console.log("RECEIVED:", razorpay_signature);
        if(expectedSignature !== razorpay_signature){
            return res.status(400).json({message:"Invalid payment signature"})
        }

        const payment= await Payment.findOne({razorpayOrderId:razorpay_order_id});
        if(!payment){
            return res.status(404).json({message:"Payment not found"})
        }
        if(payment.status === "paid"){
            return res.json({message:"Already processed"});
        }

        //update payment record
        payment.razorpayPaymentId=razorpay_payment_id;
        payment.status="paid";
        await payment.save();

        //add credits to user account
        const updatedUser= await User.findByIdAndUpdate(payment.userId,{
            $inc:{credits:payment.credits}
        },{new:true});

        return res.json({
        success:true,
        message:"Payment verified and credits added",
        user:updatedUser
        });

    }catch (error) {
        return res.status(500).json({message:`Payment verification failed ${error}`})
    }
}