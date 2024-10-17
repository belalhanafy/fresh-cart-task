import React from 'react'
import style from './MainSlider.module.css'
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'
import Slider from 'react-slick'
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
        <div className="flex flex-col lg:flex-row pt-5 mb-16">
          <div className='w-full lg:w-3/4'>
            <Slider {...settings}>
              <img loading="lazy" className='lg:h-[450px] h-auto mb-3 w-full block' src={slide1} alt="" />
              <img loading="lazy" className='lg:h-[450px] h-auto mb-3 w-full block' src={slide2} alt="" />
              <img loading="lazy" className='lg:h-[450px] h-auto mb-3 w-full block' src={slide3} alt="" />
          </Slider>
          </div>
          <div className='w-full flex flex-col md:flex-row lg:block lg:w-1/4 mt-10 lg:mt-0'>
            <img loading="lazy" src={blog1} className="lg:h-[225px] h-auto w-full block object-cover" alt=""/>
            <img loading="lazy" src={blog2} className="lg:h-[225px] h-auto w-full block object-cover" alt=""/>
          </div>
        </div>
    </>
  )
}
