import React from 'react'
import style from './Layout.module.css'
import Navber from '../Navber/Navber'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <>
        <Navber/>

        <div className='container mx-auto px-5 pt-2 pb-20'>
          <Outlet></Outlet>
        </div>

        <Footer/>
    </>
  )
}
