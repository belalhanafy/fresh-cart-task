import React, { useEffect, useState } from 'react';
import style from './Brands.module.css';
import axios from 'axios';
import Loading from '../Loading/Loading'; // Assuming you have a Loading component

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState(null);  // Use null instead of empty object
  const [loading, setLoading] = useState(true);

  async function getBrand(brandId) {
    try {
      setLoading(true);
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
      setBrand(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getAllBrands() {
    try {
      setLoading(true);
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllBrands();
    document.title = "brands"
  }, []);

  return (
    <>
        <>
          <div className={`w-full fixed left-0 bottom-0 top-0 right-0 h-full after:w-full after:h-full after:absolute after:bg-gray-950 after:opacity-45 ${!brand && 'hidden'}`}></div>
          <div className={`transition w-full h-full flex items-center justify-center fixed top-0 left-0 right-0 ${brand? 'appear' : 'hide'}`}>
            {brand?<div className='border-t border-b py-10 border-slate-300 z-40 relative w-3/5 xl:w-2/5 mx-auto bg-slate-100 rounded-md'>
              <i className="cursor-pointer text-2xl transition-all duration-300 absolute top-4 right-4 text-gray-700 hover:text-red-700 fa-solid fa-xmark" onClick={() => setBrand(null)}></i>
              <div className='border-t border-b my-5 border-slate-300'>
                <div className='p-4 flex flex-col md:flex-row items-center'>
                  <div className='w-full xl:w-1/2 flex text-center md:text-left flex-col gap-2 mb-5'>
                    <h1 className="text-main text-2xl md:text-5xl">{brand.name}</h1>
                    <p>{brand.slug}</p>
                  </div>
                  <div className='w-full xl:w-1/2'>
                    <img loading="lazy" className="block w-full" src={brand.image} alt={brand.slug} />
                  </div>
                </div>
              </div>
              <button className="hover:opacity-80 transition-all duration-100 bg-slate-500 text-white px-5 py-2 rounded-xl absolute right-4 bottom-3" onClick={() => setBrand(null)}>Close</button>
            </div>:''}
            
          </div>
        </>
      <h3 className="text-2xl my-4 text-center text-main font-semibold">All Brands</h3>
      {loading ? (
        <div className='flex justify-center mt-32'>
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {brands.length && (
            brands.map((brand) => (
              <button onClick={() => getBrand(brand._id)} key={brand._id}>
                <div data-aos="zoom-in" className="border border-slate-300 rounded-xl hover:shadow-xl hover:shadow-green-700 transition-shadow duration-300">
                  <img loading="lazy" src={brand.image} className="h-[200px] block w-full rounded-xl object-contain" alt={brand.name} />
                  <h2 className="py-5 text-main text-center text-2xl">{brand.name}</h2>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </>
  );
}
