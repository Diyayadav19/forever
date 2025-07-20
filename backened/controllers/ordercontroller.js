import ordermodel from "../models/ordermodel.js"
import usermodel from "../models/usermodel.js"
import Stripe from 'stripe'
import dotenv from 'dotenv';
dotenv.config();

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const currency='USD'
const deliveryCharge=10


const placeorder=async(req,res)=>{
    try {
        const {userid,items,amount,address}=req.body
        const orderData={
            userid,
            items,amount,address,
            paymentmethod:'COD',
            payment:false,
            date:Date.now()
        }
        console.log('Sending Order Data:', orderData)
        const neworder=new ordermodel(orderData)
        await neworder.save() 
        await usermodel.findByIdAndUpdate(userid,{cartData:{}})
        res.json({success:true,message:'Order Placed'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}
const placeorderStripe=async(req,res)=>{
    try {
        const {userid,items,amount,address}=req.body
        const {origin}=req.headers;
        const orderData={
            userid,
            items,amount,address,
            paymentmethod:'Stripe',
            payment:false,
            date:Date.now()
        }
        const neworder=new ordermodel(orderData)
        await neworder.save() 
        const line_item=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                   name: item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_item.push({
            price_data:{
                currency:currency,
                product_data:{
                   name: 'Delivery Charges'
                },
                unit_amount:deliveryCharge*100
            },
            quantity:1
        })
        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderid=${neworder._id}`,
            cancel_url:`${origin}/verify?success=false&orderid=${neworder._id}`,
            line_items: line_item,mode:'payment',
        })
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
    
}
const placeorderRazorpay=async (req,res)=>{
    
}
const verifystripe=async(req,res)=>{
    const {orderid,success,userid}=req.body
    try {
        if (success=='true'){
            await ordermodel.findByIdAndUpdate(orderid,{payment:true})
            await usermodel.findByIdAndUpdate(userid,{carData:{}})
            res.json({success:true})
        }else{
            await ordermodel.findByIdAndDelete(orderid)
            res.json({success:false})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const allOrders=async(req,res)=>{
    try{
        const orders=await ordermodel.find({})
        res.json({success:true,orders})
    }catch{
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    
}
const userOrders=async(req,res)=>{
    try {
        const {userid}=req.body
        const orders=await ordermodel.find({userid})
        res.json({success:true,orders})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    
}
const updateStatus=async(req,res)=>{
    try {
        const { orderid,status }=req.body
        await ordermodel.findByIdAndUpdate(orderid,{ status })
        res.json({success:true,message:'Status Updated'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    
}
export {verifystripe,placeorder,placeorderRazorpay,placeorderStripe,allOrders,updateStatus,userOrders}

