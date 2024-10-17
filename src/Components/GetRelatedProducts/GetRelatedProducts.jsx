import React, { useEffect, useState } from 'react'
import style from './GetRelatedProducts.module.css'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import RelatedProductsSlider from '../RelatedProductsSlider/RelatedProductsSlider';
export default function GetRelatedProducts() {
  let {catId} = useParams();
  const [relatedproducts, setRelatedProducts] = useState([])
  
  async function GetRelatedProducts(catId) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${catId}`)
    setRelatedProducts(data.data)
  }

  useEffect(() => {
    GetRelatedProducts(catId)
  }, [catId])
  
  return (
    <>
        <h3 className='text-2xl my-10 text-center text-main font-semibold'>Related Products</h3>
        <RelatedProductsSlider relPro={relatedproducts}/>
    </>
  )
}
