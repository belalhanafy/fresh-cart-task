import React from 'react'
import style from './RelatedProductsSlider.module.css'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
export default function RelatedProductsSlider({relPro}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
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
        <Slider className='mb-8' {...settings}>
          {relPro?.map((relPro,index)=> 
          <Link key={index} to={`/productDetails/${relPro.id}/${relPro.category?._id}`}>
            <div key={index}>
              <img src={relPro.imageCover} className='w-full block object-contain lg:object-cover rounded-lg shadow-md' alt=''/> 
              <p className='mt-2 mb-5 lgmb-3 text-center'>{relPro.title.split(' ').slice(0,2).join(' ')}</p>
            </div> 
          </Link>
          )}
        </Slider>
    </>
  )
}
