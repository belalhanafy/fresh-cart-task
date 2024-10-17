import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [proId, setProId] = useState(null)
  let promoCodes = ["belal311", "alaa191", "ezzat24", "mohsen10", "shobo22"];
  let navigate = useNavigate()
  let {
    clearCart,
    QuantityloadingPlus,
    QuantityloadingMinus,
    deleteCartItem,
    cart,
    loading,
    getCartItems,
    updateProductQuantityM,
    updateProductQuantityP
  } = useContext(cartContext);

  useEffect(() => {
    getCartItems();
    document.title = "cart"
  }, []);
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeDiscount, setPromoCodeDiscount] = useState(0);
  const promoCodeMessage = "Your promo code has expired or not exist at all";
  const shippingPrice = 50;

  function applyPromoCode() {
    const index = promoCodes.indexOf(promoCode);

    if (index !== -1) {
      const discount = (index + 1) * 10;
      setPromoCodeDiscount(discount);
    } else {
      setPromoCodeDiscount(0);
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center pt-10">
          <Loading />
        </div>
      ) : (
        <>
          {cart ? (
            cart.numOfCartItems > 0 ? (
              <>
                <h2 className='text-3xl mb-4 text-center mt-5 w-full text-main font-semibold'>Cart Items</h2>
                <div className="flex flex-col lg:flex-row items-start justify-center lg:space-x-3 mt-10 container mx-auto">
                  {/* Cart Items Table */}
                  <div className="flex flex-col space-x-2 lg:w-3/4 w-full">
                    <div className="hidden lg:block relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                          <tr>
                            {/* Table Headers */}
                            <th scope="col" className="px-16 py-3">
                              <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Qty</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Total Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.data.products.map((pro) => (
                            <tr key={pro.product.id} className="bg-white border-b hover:bg-gray-50">
                              {/* Product Details */}
                              <td className="p-4">
                                <img
                                  loading="lazy"
                                  src={pro.product.imageCover}
                                  className="w-16 md:w-32 max-w-full max-h-full"
                                  alt={pro.product.title}
                                />
                              </td>
                              <td className="text-xs lg:text-base px-6 py-4 font-semibold text-gray-900">{pro.product.title}</td>
                              <td className="px-6 lg:text-base text-xs py-4">
                                {/* Quantity Controls */}
                                <div className="flex items-center">
                                  <button
                                    onClick={() => {
                                      pro.count != 1 && 
                                      updateProductQuantityM(pro.product.id, pro.count - 1),
                                      setProId(pro.product.id)}}
                                    className={`${pro.count == 1 && 'cursor-not-allowed opacity-70'} inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full ${pro.count > 1 && 'hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none'}`}
                                    type="button"
                                  >
                                    <span className="sr-only">Quantity button</span>
                                    {QuantityloadingMinus && pro.product.id === proId && pro.count != 1 ? <i className="fas fa-spinner fa-spin"></i> :
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 2"
                                      >
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                      </svg>
                                    }

                                  </button>

                                  <div>
                                    <span className="text-sm lg:text-xl">{pro.count}</span>
                                  </div>

                                  <button
                                    onClick={() => {
                                      updateProductQuantityP(pro.product.id, pro.count + 1),
                                      setProId(pro.product.id)}}
                                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                    type="button"
                                  >
                                    <span className="sr-only">Quantity button</span>
                                    {QuantityloadingPlus && pro.product.id === proId ? <i className="fas fa-spinner fa-spin"></i> :
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                    </svg>
                                  } 
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 lg:text-base text-xs py-4 font-semibold text-gray-900">{pro.price}</td>
                              <td className="px-6 lg:text-base text-xs py-4 font-semibold text-gray-900">{pro.price * pro.count}</td>
                              <td className="px-6 lg:text-base text-xs py-4">
                                <button
                                  onClick={() => deleteCartItem(pro.product.id)}
                                  className="font-medium text-red-600 hover:underline"
                                >
                                  <i className="fa-solid fa-trash-can mr-1"></i>
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="lg:hidden flex flex-col text-center">
                      {cart.data.products.map((pro) => (
                        <div
                          key={pro.product.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          {/* Product Details */}
                          <div className="p-4 flex justify-center">
                            <img
                              loading="lazy"
                              src={pro.product.imageCover}
                              className="shadow-2xl w-[400px] block h-[400px] object-contain"
                              alt={pro.product.title}
                            />
                          </div>
                          <h2 className="text-base px-6 py-4 font-semibold text-gray-900">
                            {pro.product.title}
                          </h2>
                          <div className="px-6 lg:text-base text-xs py-4">
                            <div className="flex items-center justify-center">
                              {/* Minus button */}
                              <button
                                    onClick={() => {
                                      pro.count != 1 && 
                                      updateProductQuantityM(pro.product.id, pro.count - 1),
                                      setProId(pro.product.id)}}
                                    className={`${pro.count == 1 && 'cursor-not-allowed opacity-70'} inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full ${pro.count > 1 && 'hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none'}`}
                                    type="button"
                                  >
                                    <span className="sr-only">Quantity button</span>
                                    {QuantityloadingMinus && pro.product.id === proId && pro.count != 1 ? <i className="fas fa-spinner fa-spin"></i> :
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 2"
                                      >
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                      </svg>
                                    }

                                  </button>

                              {/* Quantity display */}
                              <div>
                                <span className="text-sm lg:text-xl">{pro.count}</span>
                              </div>

                              {/* Plus button */}
                              <button
                                    onClick={() => {
                                      updateProductQuantityP(pro.product.id, pro.count + 1),
                                      setProId(pro.product.id)}}
                                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                    type="button"
                                  >
                                    <span className="sr-only">Quantity button</span>
                                    {QuantityloadingPlus && pro.product.id === proId ? <i className="fas fa-spinner fa-spin"></i> :
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                    </svg>
                                  } 
                                  </button>
                            </div>
                          </div>

                          <p className="px-6 text-base py-4 font-semibold text-gray-900">
                            Price : {pro.price} EGP
                          </p>
                          <p className="px-6 text-base py-4 font-semibold text-gray-900">
                            Totla Price : {pro.price * pro.count} EGP
                          </p>
                          <div className="px-6 text-base py-4">
                            <button
                              onClick={() => deleteCartItem(pro.product.id)}
                              className="font-medium text-red-600 hover:underline"
                            >
                              <i className="fa-solid fa-trash-can mr-1"></i>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10">
                      <div className="flex justify-between flex-col gap-5 lg:flex-row">
                        <Link to={"/home"} className="bg-green-500 py-2 px-4 shadow-md rounded-lg text-center text-white">
                          <i className="mr-2 fas fa-reply"></i> CONTINUE SHOPPING
                        </Link>
                        <button
                          onClick={() => clearCart()}
                          className="bg-green-500 text-center py-2 px-4 shadow-md rounded-lg text-white"
                        >
                          <i className="mr-2 fa-solid fa-circle-xmark"></i> EMPTY CART
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cart Totals */}
                  <div className="p-2 border-2 sm:rounded-lg border-slate-700 lg:w-1/4 w-full mt-10 lg:mt-0">
                    <h2 className="border-b border-slate-500 pb-2 text-xl font-semibold">CART TOTALS</h2>
                    <div className="border-b border-slate-500 py-3 text-slate-500">
                      <div className="flex justify-between mb-3">
                        <span><span className="mr-2">{cart.numOfCartItems}</span>Items</span>
                        <span><span className="mr-2">{cart.data.totalCartPrice}</span> EGP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {cart.numOfCartItems >= 8 ? "free" : shippingPrice + " EGP"}
                        </span>
                      </div>
                    </div>
                    <div className="border-b border-slate-500">
                      <div className="py-3 flex justify-between space-x-4">
                        <input
                          type="text"
                          className="w-3/4 border border-slate-700 p-2 outline-none"
                          placeholder="Have A Promo Code?"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button
                          onClick={() => applyPromoCode()}
                          className="w-1/4 bg-black text-white"
                        >
                          Add
                        </button>
                      </div>
                      {promoCodes.indexOf(promoCode) === -1 && promoCode.length > 0 && (
                        <div
                          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
                          role="alert"
                        >
                          <span className="font-medium">{promoCodeMessage}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-b my-3 border-slate-500 py-3 text-slate-500">
                      <div className="flex justify-between mb-3">
                        <span className="mr-2">SubTotal</span>
                        <span><span className="mr-2">{cart.data.totalCartPrice}</span> EGP</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="mr-2">Promo Code Discount</span>
                        <span><span className="mr-2">-{promoCodeDiscount}</span>EGP</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="mr-2">Total</span>
                        <span><span className="mr-2">{cart.data.totalCartPrice + shippingPrice - promoCodeDiscount}</span> EGP</span>
                      </div>
                    </div>

                    <Link to={"/checkOut"}>
                      <button className="bg-green-500 py-2 px-4 shadow-md rounded-lg text-white w-full">
                        CHECKOUT
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col mt-10 items-center justify-center gap-5">
                <i className="text-gray-300 text-[140px] leading-[140px] font-semibold fas fa-cart-shopping"></i>
                <h2 className="mb-2 text-2xl leading-tight">Your cart is currently empty.</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Before proceed to checkout, you must add some products to your shopping cart.
                </p>
                <Link
                  to={"/home"}
                  className="flex items-center gap-3 bg-green-500 py-2 px-4 shadow-md rounded-lg text-white"
                >
                  <i className="fas fa-reply"></i> RETURN TO SHOP
                </Link>
              </div>
            )
          ) : <div className="flex flex-col mt-10 items-center justify-center gap-5">
            <i className="text-gray-300 text-[140px] leading-[140px] font-semibold fas fa-cart-shopping"></i>
            <h2 className="mb-2 text-2xl leading-tight">Your cart is currently empty.</h2>
            <p className="mt-2 text-sm text-gray-500">
              Before proceed to checkout, you must add some products to your shopping cart.
            </p>
            <Link
              to={"/home"}
              className="flex items-center gap-3 bg-green-500 py-2 px-4 shadow-md rounded-lg text-white"
            >
              <i className="fas fa-reply"></i> RETURN TO SHOP
            </Link>
          </div>}
        </>
      )}
    </>
  );
}
