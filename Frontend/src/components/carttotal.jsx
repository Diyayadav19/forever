import React, { useContext } from 'react'
import { Shopcontext } from '../context/shopcontext'
import Title from './title'

function Carttotal() {
    const {currency,deliveryfee,getcartamount}=useContext(Shopcontext);
  return (
    <div className='w-full'> 
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>SubTotal</p>
                <p>{currency}{getcartamount()}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between' >
                <p >Shipping Fee</p>
                <p>{currency}{deliveryfee}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {getcartamount()===0?0:getcartamount()+deliveryfee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default Carttotal