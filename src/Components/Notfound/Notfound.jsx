import React, { useEffect } from 'react'
import style from './Notfound.module.css'
import notFound from '../../assets/images/error.svg'
export default function Notfound() {
  useEffect(() => {
    document.title = "not found"
  }, [])
  return (
    <>
        <div className='flex justify-center'>
          <img loading="lazy" src={notFound} alt="not found" />
        </div>
    </>
  )
}
