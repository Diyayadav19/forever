import express from 'express';
import { addProduct,listProduct,removeProduct, singleProduct} from '../controllers/productcontroller.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminauth.js';


const productRouter=express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.get('/list',listProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.get('/single/:id',singleProduct);

export default productRouter;