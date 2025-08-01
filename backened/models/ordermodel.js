import mongoose from 'mongoose'
const orderScheme=new mongoose.Schema({
    userid:{type:String ,required:true},
    items:{type:Array ,required:true},
    amount:{type:Number ,required:true},
    address:{type:Object ,required:true},
    status:{type:String ,required:true,default:'Order Placed'},
    paymentmethod:{type:String ,required:true},
    payment:{type:Boolean ,required:true ,default:false},
    date:{type:Number ,required:true}
})
const ordermodel =mongoose.models.order||mongoose.model('order',orderScheme)
export default ordermodel
