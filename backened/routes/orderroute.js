import express from 'express'
import {placeorder,placeorderRazorpay,placeorderStripe,allOrders,updateStatus,userOrders, verifystripe} from '../controllers/ordercontroller.js'
import adminAuth from '../middleware/adminauth.js'
import Authuser from '../middleware/auth.js'
const orderRouter=express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

orderRouter.post('/place',Authuser,placeorder)
orderRouter.post('/stripe',Authuser,placeorderStripe)
orderRouter.post('/razorpay',Authuser,placeorderRazorpay)

orderRouter.post('/userorders',Authuser,userOrders)
orderRouter.post('/verifystripe',Authuser,verifystripe)

export default orderRouter