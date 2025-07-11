import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/shopcontext'
import Title from './title'
import Productitem from './productitem'

export const Relatedproduct = ({ category, subCategory }) => {
    const { products } = useContext(Shopcontext)
    const [Related, setRelated] = useState([])
    useEffect(() => {
        if (products.length > 0) {
            let productscopy = products.slice();
            productscopy = productscopy.filter((item) => category === item.category);
            productscopy = productscopy.filter((item) => subCategory === item.subCategory);
            const topFive = productscopy.slice(0, 5);
            setRelated(topFive);

        }
    }, [products])
    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-col-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {Related.map((item, index) => (
                    <Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    )
}
