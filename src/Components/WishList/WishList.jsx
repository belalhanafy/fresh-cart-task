import React, { useContext } from "react";
import style from "./WishList.module.css";
import { cartContext } from "../../Context/CartContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
export default function WishList() {
  let navigate = useNavigate()
  let { wishList, loading, addToCart, removeFromWishList } = useContext(cartContext);
  console.log(wishList);

  return (
    <>
      {loading ? (
        <div className="flex justify-center pt-10">
          <Loading />
        </div>
      ) : (
        <>
          {wishList ? (
            wishList.count > 0 ? (
              <>
                <div className="w-5/6 mt-10 container mx-auto">
                  <div className="flex flex-col space-x-2">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        
                          <tr>
                            <th scope="col" className="px-16 py-3">
                              <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Action
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                          </tr>
                          
                        </thead>
                        <tbody>
                          {wishList.data.map((item) => (
                          
                            <tr
                                key={item.id}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                              {/* Product Details */}
                              <td className="p-4">
                                <img
                                  src={item.imageCover}
                                  className="w-16 md:w-32 max-w-full max-h-full"
                                  alt={item.title}
                                />
                              </td>
                              <td className="text-xs lg:text-base px-6 py-4 font-semibold text-gray-900">
                                {item.title}
                              </td>
                              <td className="px-6 lg:text-base text-xs py-4 font-semibold text-gray-900">
                                {item.price}
                              </td>
                              <td className="px-6 lg:text-base text-xs py-4">
                                <button
                                  onClick={() => removeFromWishList(item.id)}
                                  className="font-medium text-red-600 hover:underline"
                                >
                                  Remove
                                </button>
                              </td>
                              <td className="px-6 lg:text-base text-xs py-4">
                                <button
                                  onClick={() => addToCart(item.id)}
                                  className="bg-main text-sm lg:text-base p-3 whitespace-nowrap text-white rounded-md font-semibold"
                                >
                                  Add To Cart
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-10">
                      <div className="flex justify-center">
                        <Link
                          className="bg-green-500 py-2 px-4 shadow-md rounded-lg text-white"
                          to="/home"
                        >
                          <i className="mr-2 fas fa-reply" /> CONTINUE SHOPPING
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col mt-10 items-center justify-center gap-5">
                <i className="text-gray-300 text-[140px] leading-[140px] font-semibold fa-regular fa-heart"></i>
                <h2 className="mb-2 text-2xl leading-tight">
                  Your cart is currently empty.
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Before proceed to checkout, you must add some products to your
                  shopping cart.
                </p>
                <Link
                  to={"/home"}
                  className="flex items-center gap-3 bg-green-500 py-2 px-4 shadow-md sm:rounded-lg text-white"
                >
                  <i className="fas fa-reply"></i> RETURN TO SHOP
                </Link>
              </div>
            )
          ) : (
            <div className="flex flex-col mt-10 items-center justify-center gap-5">
              <i className="text-gray-300 text-[140px] leading-[140px] font-semibold fas fa-cart-shopping"></i>
              <h2 className="mb-2 text-2xl leading-tight">
                {" "}
                Wishlist list is empty.
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                No products added in the wishlist list. You must add some
                products to wishlist them.
              </p>
              <Link
                to={"/home"}
                className="flex items-center gap-3 bg-green-500 py-2 px-4 shadow-md sm:rounded-lg text-white"
              >
                <i className="fas fa-reply"></i> RETURN TO SHOP
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
