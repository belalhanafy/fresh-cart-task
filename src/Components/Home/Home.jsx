import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import RecentProduct from '../RecentProduct/RecentProduct'
import Loading from '../Loading/Loading'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
export default function Home() {
  const [products, setProducts] = useState([])
  async function getAllProducts() {
    try {
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      setProducts(data.data)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    getAllProducts()
    document.title = "home"
  }, [])
  
  return (
    <>
        <MainSlider/>
        <CategorySlider/>
        <h3 className='text-2xl my-4 text-center text-main font-semibold'>All Products</h3>
        {products.length?<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10'>
          {products.map((pro)=> <RecentProduct key={pro.id} pro={pro}/>)}
        </div>:<div className='flex justify-center mt-32'>
            <Loading/>
          </div>}
        
    </>
  )
}
