import express from 'express';
import { addtocart, updatecart, getusercart } from '../controllers/cartcontroller.js';

import Authuser from '../middleware/auth.js';
const cartRouter=express.Router();

cartRouter.post('/get' ,Authuser ,getusercart)
cartRouter.post('/add' ,Authuser ,addtocart)
cartRouter.post('/update' ,Authuser ,updatecart)

export default cartRouter