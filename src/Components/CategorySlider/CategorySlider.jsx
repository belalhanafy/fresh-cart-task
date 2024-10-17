import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import Slider from 'react-slick'
import axios from 'axios'
export default function CategorySlider() {
  
  const [categories, setCategories] = useState([])
  async function getAllCategories() {
    try {
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data.data)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    getAllCategories()
  }, [])
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024, // for large screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 900, // for tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 500, // for mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots:false
        }
      }
    ]
  };
  return (
    <>
        <h3 className='text-2xl my-4 text-center text-main font-semibold'>Shop Popular Category</h3>
        <Slider className='mb-16' {...settings}>
          {categories?.map((cat,index)=><div key={index}>
            <div className='mx-2'>
              <img loading="lazy" src={cat.image} className='w-full block h-[250px] object-contain lg:object-cover rounded-lg shadow-md' alt=''/> 
              <p className='mt-2 mb-5 lgmb-3 text-center'>{cat.name}</p>
            </div>
          </div> 
         )}
        </Slider>
    </>
  )
}
