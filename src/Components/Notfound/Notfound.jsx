import React from 'react'
import style from './Notfound.module.css'
import notFound from '../../assets/images/error.svg'
export default function Notfound() {
  return (
    <>
        <div className='flex justify-center'>
          <img src={notFound} alt="not found" />
        </div>
    </>
  )
}
