import React from 'react'
import style from './RecentCategory.module.css'
export default function RecentCategory({cat,getCatIdndName}) {  
  return (
    <>
        <button onClick={()=>getCatIdndName(cat._id,cat.name)}>
            <div className='border border-slate-300 rounded-xl hover:shadow-lg hover:shadow-green-700 transition-shadow duration-500'>
              <img src={cat.image} className='h-[500px] shadow-md block w-full rounded-xl object-contain' alt=''/> 
              <h2 className='py-5 text-main text-center text-2xl '>{cat.name}</h2>
            </div> 
        </button>
    </>
  )
}
