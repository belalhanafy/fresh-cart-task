import React from 'react'
import style from './RelatedProductsSlider.module.css'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import RecentProduct from '../RecentProduct/RecentProduct';
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
          <div key={index}>
            <div className='mx-2 mb-6' key={index}>
              <RecentProduct key={relPro.id} pro={relPro}/>
            </div> 
          </div>
          )}
        </Slider>
    </>
  )
}
