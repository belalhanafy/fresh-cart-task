import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import GetRelatedProducts from "../GetRelatedProducts/GetRelatedProducts";
import { cartContext } from "../../Context/CartContext";

var settings = {
  className: "center",
  centerMode: true,
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1500,
};

export default function ProductDetails() {
  let { productId } = useParams();
  const [productdetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  let {addToCart, addToWishList, wishListProducts, setWishListProducts, removeFromWishList} = useContext(cartContext)
  const [solid, setSolid] = useState(false)
  function handleHeartClick() {
    if (wishListProducts.includes(productId.id)) {
      const updatedWishList = wishListProducts.filter(id => id !== productId);
      setWishListProducts(updatedWishList);
      removeFromWishList(productId)
      setSolid(false);
    } else {
      if (!solid) {
        const updatedWishList = [...wishListProducts, productId];
        addToWishList(productId)
        setWishListProducts(updatedWishList);
        setSolid(true)
      } else {
        const updatedWishList = wishListProducts.filter(id => id !== productId);
        removeFromWishList(productId)
        setWishListProducts(updatedWishList);
        setSolid(false);
      }
    }
  }
  async function getProductDetails(proId) {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${proId}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getProductDetails(productId);
    document.title = "product details"
  }, [productId]);

  return (
    <>
      <h3 className="text-2xl mt-4 text-center text-main font-semibold">
        Product Details
      </h3>
      {loading ? (
        <div className="flex justify-center mt-32">
          <Loading />
        </div>
      ) : (
        <>
          {productdetails && (
            <>
              <div className="my-10 rounded-xl relative shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] p-3 flex lg:flex-row flex-col justify-center items-center py-5">
              <button onClick={() => {
                handleHeartClick();
                }}>
                <i className={`absolute top-4 right-4 text-xl fa-solid fa-heart ${wishListProducts.includes(productId) && 'text-red-600'}`}></i>
                </button>
                <div className="lg:w-[30%] text-center w-full my-10 lg:mr-10">
                {productdetails.images.length > 1 ? <Slider {...settings}>
                    {productdetails.images?.map((image, index) => (
                      <div>
                        <div className="mx-2">
                          <img
                          key={index}
                          src={image}
                          className="w-full block object-cover"
                          alt=""
                          />
                        </div>
                      </div>
                     
                    ))}
                  </Slider> : <img
                        src={productdetails.imageCover}
                        className="w-full block"
                        alt=""
                      />}
                </div>
                <div className="lg:w-3/4 lg:text-left text-center w-full">
                  <div>
                    <h2 className="font-semibold text-xl">
                      {productdetails.title}
                    </h2>
                    <p className="my-4 text-gray-500">
                      {productdetails.description}
                    </p>
                    <h3 className="my-4 text-main">
                    <span className="text-black">Category: </span>
                      {productdetails.category?.name}
                    </h3>
                    <h3 className="my-4 text-main">
                    <span className="text-black"> Brand: </span>
                      {productdetails.brand?.name}
                    </h3>
                    <h3 className=" my-4 text-main">
                      <span className="text-black">Subcategory: </span> {productdetails.subcategory[0]?.name}
                    </h3>
                    <div className="flex justify-between mt-1">
                      <p className="text-main">{productdetails.price} EGP</p>
                      <p>
                        <i className="mr-1 fas fa-star rating-color" />
                        {productdetails.ratingsAverage}
                      </p>
                    </div>
                    <button onClick={()=>addToCart(productdetails.id)} className="detailsBtn p-2 mt-3 w-full bg-main text-center rounded text-white">
                      <i className="mr-2 fa-solid fa-cart-plus" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <GetRelatedProducts />
              </div>
              <div className="flex justify-center mt-20">
                <Link
                  className="bg-green-500 py-2 px-4 shadow-md sm:rounded-lg text-white"
                  to="/home"
                >
                  <i className="mr-2 fas fa-reply" /> CONTINUE SHOPPING
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
