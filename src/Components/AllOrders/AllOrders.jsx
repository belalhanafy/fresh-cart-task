import React, { useContext, useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import { cartContext } from '../../Context/CartContext'
import axios from 'axios';
import { userContext } from '../../Context/UserContext';
import { jwtDecode } from "jwt-decode";
import Loading from '../Loading/Loading';

export default function AllOrders() {
  let { userData } = useContext(userContext)
  let { clearCart } = useContext(cartContext)
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [OrderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    if (userData) {
      const decoded = jwtDecode(userData);
      setUserId(decoded?.id);
    }
  }, [userData]);

  function showOrderDetails(OrderId) {
    orders.map((order)=>{
      if (order.id == OrderId) {
        setOrderDetails(order)
      }
    })
  }
  console.log(OrderDetails);
  console.log(OrderDetails?.cartItems);
  async function getAllOrders() {
    try {
      setLoading(true);
      let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      setOrders(data.data);
      console.log(data.data);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (userId) {
      clearCart();
      getAllOrders();
      document.title = "Orders";
    }
  }, [userId]);
  return (
    <>
      <>
        <div className={`z-40 w-full fixed left-0 bottom-0 top-0 right-0 h-full after:w-full after:h-full after:absolute after:bg-gray-950 after:opacity-45 ${!OrderDetails && 'hidden'}`}></div>
        <div className={`transition z-40 w-full h-full flex items-center justify-center fixed top-5 left-0 right-0 ${OrderDetails ? 'appear' : 'hide'}`}>
          {OrderDetails ? <div className='border-t border-b py-10 pb-2 border-slate-300 z-40 relative w-3/5 xl:w-2/5 mx-auto bg-slate-100 rounded-md overflow-y-auto max-h-[80vh]'>
            <div className='flex items-center p-4 pb-0 text-green-700 text-xl font-semibold'>
              <h2>Order Items:</h2>
            </div>
            <i className="cursor-pointer text-2xl transition-all duration-200 absolute top-4 right-4 text-gray-700 hover:text-red-700 fa-solid fa-xmark" onClick={() => setOrderDetails(null)}></i>
            {OrderDetails?.cartItems?.map((order)=>{
              return (
              <div key={order.product.id} className='border-b border-slate-300'>
                <div className='p-4 gap-3 flex flex-col md:flex-row items-center'>
                  <div>
                    <img loading="lazy" className="lg:w-20 w-40" src={order.product.imageCover} alt={order.product.title} />
                  </div>
                  <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 items-center'>
                    <p className='font-semibold'>Name: <span className='text-slate-600 font-bold'>{order.product.title.split(' ').slice(0,2).join(' ')}</span></p>
                    <p className='font-semibold'>Price: <span className='text-slate-600 font-bold'>{order.price}</span></p>
                    <p className='font-semibold'>Quantity: <span className='text-slate-600 font-bold'>{order.count}</span></p>
                    <p className='font-semibold'>Total Price: <span className='text-slate-600 font-bold'>{order.price * order.count}</span></p>
                  </div>
                </div>
              </div>
              );
            })}
            <div className='flex justify-end m-5 mb-0'>
              <button className="hover:opacity-80 w-full transition-all duration-100 bg-slate-500 text-white px-5 py-2 rounded-xl" onClick={() => setOrderDetails(null)}>Close</button>
            </div>
          </div> : ''}
        </div>
      </>

      <h3 className="text-2xl my-4 text-center text-main font-semibold">All Orders</h3>
      {
        loading ? (
          <div className="flex justify-center pt-10">
            <Loading />
          </div>
        ) : (
          orders.length ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-10'>
              {orders.map((order) => (
                <div key={order.id} className='flex flex-col'>
                  <div className='flex justify-between items-center p-2 bg-green-400 text-white rounded-tr-lg rounded-tl-lg'>
                    <p>ID: {order.id}</p>
                    <p>{order.createdAt.slice(0, 10)}</p>
                  </div>
                  <div className='bg-slate-200 p-2 rounded-br-lg rounded-bl-lg'>
                    <div className='flex flex-col gap-2'>
                      <p className='font-semibold'>Order Price: <span className='text-slate-600 font-bold'>{order.totalOrderPrice}</span></p>
                      <p className='font-semibold'>Payment Method: <span className='text-slate-600 font-bold'>{order.paymentMethodType}</span></p>
                    </div>
                    <div className='flex gap-2 items-center mt-3'>
                      <p className={`font-semibold px-2 py-1 rounded-lg text-white ${order.isPaid ? "bg-blue-600" : "bg-red-600"}`}>
                        {order.isPaid ? "PAID" : "NOT PAID"}
                      </p>
                      <p className={`font-semibold px-2 py-1 rounded-lg text-white ${order.isDelivered ? "bg-blue-600" : "bg-red-600"}`}>
                        {order.isDelivered ? "DELIVERED" : "NOT DELIVERED"}
                      </p>
                    </div>
                    <button onClick={()=>showOrderDetails(order.id)} type="button" className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-md px-5 py-2.5 me-2 mb-2 mt-4 w-full">
                      Order Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center pt-10">
              <p>No orders found.</p>
            </div>
          )
        )
      }

    </>
  )
}
