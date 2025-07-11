import {createContext, useEffect, useState} from 'react';
import {products } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const Shopcontext =createContext();

const Shopcontextprovider=(props)=>{
    const currency='$';
    const deliveryfee=10;
    const [search,setsearch]=useState('');
    const [showsearch,setshowsearch]=useState(false)
    const [cartitems,setcartitems]=useState({})
    const navigate=useNavigate();

    const addtocart=async(itemId,size)=>{
        if(!size){
            toast.error(`Select Product Size`);
            return;
        }
        let cartData=structuredClone(cartitems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setcartitems(cartData);
    }
    const getcartcount=()=>{
        let totalcount=0;
        for(const items in cartitems){
            for (const item in cartitems[items]){
                try {
                    if(cartitems[items][item]>0){
                        totalcount+=cartitems[items][item];
                    }
                }
                catch (error){ 

                }
            }
        }
        return totalcount;
    }
    const updatequantity=async (itemId,size,quantity)=>{
        let cartdata=structuredClone(cartitems);
        cartdata[itemId][size]=quantity;
        setcartitems(cartdata);
    } 
     const getcartamount=()=>{
        let totalamount=0;
        for(const items in cartitems){
            let iteminfo=products.find((product)=>product._id===items);
            for(const item in cartitems[items]){
                try{
                    if(cartitems[items][item]>0){
                        totalamount+=iteminfo.price*cartitems[items][item];
                    }
                }catch(error){}
            }
        }
        return totalamount;
     }

    const value={
        products,currency,deliveryfee,search,setsearch,showsearch,setshowsearch,
        cartitems,addtocart,getcartcount,updatequantity,getcartamount,
        getcartamount,navigate
    }
    return (
        <Shopcontext.Provider value={value}>
            {props.children}

        </Shopcontext.Provider>
    )
}
export default Shopcontextprovider; 