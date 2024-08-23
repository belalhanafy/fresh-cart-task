import React, { useContext , useEffect } from 'react'
import style from './AllOrders.module.css'
import { cartContext } from '../../Context/CartContext'
export default function AllOrders() {
  let {clearCart} = useContext(cartContext)
  useEffect(() => {
    clearCart()
  }, [])
  
  return (
    <>
        <h1>AllOrders</h1>
    </>
  )
}
