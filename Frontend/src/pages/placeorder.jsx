import React, { useContext, useState } from 'react'
import Title from '../components/title'
import Carttotal from '../components/carttotal'
import { assets } from '../assets/assets'
import { Shopcontext } from '../context/shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {
  const {navigate,backendUrl,token,cartitems,getcartamount,deliveryfee,products,setcartitems}=useContext(Shopcontext)
  const [method,setmethod]=useState('cod');
  const [formdata ,setformdata]=useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setformdata(data=>({...data,[name]:value}))

  }
  

  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
      let orderitems=[]
      for(const items in cartitems){
        for(const item in cartitems[items]){
          if (cartitems[items][item]>0) {
            const iteminfo=structuredClone(products.find(product=>product._id===items))
            if(iteminfo){
              iteminfo.size=item
              iteminfo.quantity=cartitems[items][item]
              orderitems.push(iteminfo)
            }
          } 
        }
      }
      let orderData={
        address:formdata,
        items:orderitems,
        amount:getcartamount()+deliveryfee
      }
      switch (method){
        case 'cod':
          const response=await axios.post(`${backendUrl}/api/order/place`, orderData ,{headers:{token}})
          console.log(response.data.success);
          if (response.data.success){
            setcartitems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break;
        case 'stripe':
          const responsestripe=await axios.post(`${backendUrl}/api/order/stripe`, orderData ,{headers:{token}})
          if (responsestripe.data.success) {
            const {session_url}=responsestripe.data
            window.location.replace(session_url) 
          }else{
            toast.error(responsestripe.data.message)
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstname' value={formdata.firstname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastname' value={formdata.lastname}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formdata.email}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='E-mail' />
        <input required onChange={onChangeHandler} name='street' value={formdata.street}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formdata.city}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City name' />
          <input required onChange={onChangeHandler} name='state' value={formdata.state}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State name' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formdata.zipcode}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='ZIP Code' />
          <input required onChange={onChangeHandler} name='country' value={formdata.country}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formdata.phone}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone' />
      </div>
      <div>
        <div>
          <Carttotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div  className='flex gap-3 flex-col lg:flex-row'> 
            <div onClick={()=>setmethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe' ? 'bg-green-400' : ''}`}> </p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt=''/>
            </div>
            <div onClick={()=>setmethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt=''/>
            </div>
            <div onClick={()=>setmethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-600 text-sm font-medium mx-4'>Cash On Delivery</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>Place Order</button>
          </div>
        </div>
      </div>
    </form>  
  )
}

export default Placeorder