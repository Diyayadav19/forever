import React, { useContext, useState , useEffect } from 'react'
import {Shopcontext} from '../context/shopcontext'
import Title from '../components/title'
import axios from 'axios'

const Order = () => {
  const {backendUrl,token,currency}=useContext(Shopcontext)
  const [orderData,setorderData]=useState([])
  const loadOrderdata=async()=>{
    try{
      if(!token){
        return null
      }
      const response =await axios.post(`${backendUrl}/api/order/userorders`, {} ,{headers:{token}})
      console.log(response.data);
      if(response.data.success){
        let allOrderitem=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentmethod']=order.paymentmethod
            item['date']=order.date
            allOrderitem.push(item)
          })
        })
        setorderData(allOrderitem.reverse())
       
      }
    }catch(error){

    }
  }
  useEffect(() => {
    loadOrderdata();
  }, [token]);
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt=''/>
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'> 
                  <p>{currency} {item.price}</p>
                  <p>Quantity:{item.quantity}</p>
                  <p>Size:{item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentmethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderdata} className='border px-4 py-2 text-sm font-medium rounded-sm '>Track your ORDERS</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order