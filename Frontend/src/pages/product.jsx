import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Shopcontext } from '../context/shopcontext';
import { assets } from '../assets/assets';
import { Relatedproduct } from '../components/relatedproduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addtocart } = useContext(Shopcontext);
  const [productData, setproductData] = useState(false);
  const [image, setimage] = useState('')
  const [size, setsize] = useState('')
  const fetchProductdata = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setproductData(item)
        setimage(item.image[0])
        
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductdata();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt='' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]' >
            <img className='w-full h-auto' src={image} alt='' />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2x1 mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_dull_icon} alt="" className='w-3 5' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3x1 font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setsize(item)} className={`border py-2 px-4 bg-gray-100 ${item == size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
            <button onClick={()=>addtocart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on Delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
        <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>An e-commerce website is an online platform where businesses sell products or services directly to customers via the internet.</p>
            <p>It essentially functions as a virtual storefront, allowing customers to browse, select, and purchase items online, without needing a physical retail location.</p>
            <p>These websites typically include product catalogs, shopping carts, payment gateways, and order management systems.</p>
          </div>
        </div>
        <Relatedproduct category={productData.category} subCategory={productData.subCategory}/>

      </div>

    
  ) : <div className='opacity-0'> </div>

}

export default Product