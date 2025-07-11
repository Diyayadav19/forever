import React from 'react'
import {useContext , useEffect} from 'react'
import { Shopcontext } from '../context/shopcontext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Verify = () => {
    const {navigate,token,setcartitems,backendUrl}=useContext(Shopcontext)
    const [searchParams,setsearchParams]= useSearchParams()

    const success =searchParams.get('success')
    const orderid=searchParams.get('orderid')
    const verifyPayment=async()=>{
        try {
            if (!token) {
                return null;
            }
            const response=await axios.post(`${backendUrl}/api/order/verifystripe`, {success,orderid} ,{headers:{token}})
            console.log(response.data.success);
            if (response.data.success){
              setcartitems({})
              navigate('/orders')
            }else{
              navigate('/cart')

            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }
    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div> 

    </div>
  )
}
