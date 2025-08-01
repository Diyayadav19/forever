import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/shopcontext'
import Title from './title'
import Productitem from './productitem'

const Latestcollection = () => {
  const { products } = useContext(Shopcontext)
  const [latestproducts, setlatestproducts] = useState([])
  useEffect(() => {
    setlatestproducts(products.slice(0, 10));
  }, [products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestproducts.map((item, index) => (
            <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }

      </div>

    </div>
  )
}

export default Latestcollection;