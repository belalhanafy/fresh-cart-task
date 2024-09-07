import React, { useContext, useState } from 'react'
import style from './RecentProduct.module.css'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
export default function RecentProduct({pro}) {
  let {addToCart, addToWishList, wishListProducts, setWishListProducts, removeFromWishList} = useContext(cartContext)
  const [solid, setSolid] = useState(false)
  function handleHeartClick(e) {
    console.log(e);
    if (wishListProducts.includes(pro.id)) {
      const updatedWishList = wishListProducts.filter(id => id !== pro.id);
      setWishListProducts(updatedWishList);
      removeFromWishList(pro.id)
      console.log(updatedWishList);
      setSolid(false);
    } else {
      if (!solid) {
        const updatedWishList = [...wishListProducts, pro.id];
        console.log(updatedWishList);
        addToWishList(pro.id)
        setWishListProducts(updatedWishList);
        setSolid(true)
      } else {
        const updatedWishList = wishListProducts.filter(id => id !== pro.id);
        console.log(updatedWishList);
        removeFromWishList(pro.id)
        setWishListProducts(updatedWishList);
        setSolid(false);
      }
    }
  }
  return (
    <>
        <div className='product relative pb-3 hover:shadow-lg hover:shadow-green-700 transition-shadow duration-300'>
        <button onClick={() => {
                handleHeartClick();
            }}>
          <i className={`absolute z-30 top-4 right-4 text-xl fa-solid fa-heart ${wishListProducts.includes(pro.id) && 'text-red-600'}`}></i>
        </button>
          <Link to={`/productDetails/${pro.id}/${pro.category._id}`}>
            <img className='shadow-md block w-full rounded-2xl' src={pro.imageCover} alt={pro.title} />
            <div className='px-3 py-2'>
              
              <h2 className='text-main text-sm'>{pro.category.name}</h2>
              <p className='font-medium text-xl'>{pro.title.split(' ').slice(0,2).join(' ')}</p>
              <div className="flex justify-between mt-4">
                <p>{pro.price} EGP</p>
                <p>
                  <i className="mr-1 fas fa-star rating-color" />
                  {pro.ratingsAverage}
                </p>
              </div>
            </div>
          </Link>
          <div className="px-3">
            <button onClick={()=>addToCart(pro.id)} className="btn p-2 w-full bg-main text-center rounded-xl text-white">
              <i className=" mr-2 fa-solid fa-cart-plus" />Add to cart</button>
          </div>
        </div>
    </>
  )
}
