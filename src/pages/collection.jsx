import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/shopcontext'
import { assets } from '../assets/assets';
import Title  from '../components/title';
import Productitem from '../components/productitem';

const Collection = () => {
  const { products,search,showsearch } = useContext(Shopcontext);
  const [ showfilter, setshowfilter ] = useState(false);
  const [filterproducts, setfilterproducts ] = useState([]);
  const [category,setcategory] =useState([]);
  const [subCategory,setsubCategory] =useState([]);
  const [sortType,setsortType]=useState('relavent');
  const togglecategory=(e)=>{
    if(category.includes(e.target.value)){
      setcategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setcategory(prev=>[...prev,e.target.value])
    }
  }
  const togglesubcategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setsubCategory(prev=>[...prev,e.target.value])
    }
  }
  const applyfilter=()=>{
    let productscopy=products.slice();
    if(showsearch && search){
      productscopy=productscopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productscopy=productscopy.filter(item=>category.includes(item.category));
    }
    if(subCategory.length>0){
      productscopy=productscopy.filter(item=>subCategory.includes(item.subCategory));
    }

    setfilterproducts(productscopy)
    
  }
  const sortproducts=()=>{
    let fpcopy=filterproducts.slice();
    switch(sortType){
      case 'low-high':
        setfilterproducts(fpcopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
          setfilterproducts(fpcopy.sort((a,b)=>(b.price-a.price)));
          break;
      default:
        applyfilter();
        break;
    }
  }

  useEffect(()=>{
    applyfilter();
   } ,[category,subCategory,search,showsearch])
   useEffect(()=>{
    sortproducts();
   },[sortType])
  



  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p onClick={()=>setshowfilter(!showfilter)} className='my-2 text-xl flex itmes-center cursor-pointer gap-2'>FILTERS</p>
        <img className={`h-3 sm:hidden ${showfilter ?'rotate-90' : ''}`} src={assets.dropdown_icon} alt=''/>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={togglecategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={togglecategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={togglecategory}/>Kids
            </p>
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={togglesubcategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={togglesubcategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winterwear'} onChange={togglesubcategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2x1 mb-4'>
        <Title text1={'ALL'} text2={'COLLECTIONS'} />
        <select onChange={(e)=>setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
          <option value="relavent">Sort by: Relavent</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by:High to Low</option>
         </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterproducts.map((item,index)=>(
              <Productitem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection