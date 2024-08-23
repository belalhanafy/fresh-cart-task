import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import RecentCategory from '../RecentCategory/RecentCategory'
import RelatedSubCategories from '../RelatedSubCategories/RelatedSubCategories'
import Loading from '../Loading/Loading'
export default function Categories() {
  const [categories, setCategories] = useState([])
  const [catId, setCatId] = useState(null)
  const [catName, setCatName] = useState(null)
  async function getAllCategories() {
    try {
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data.data)
    } catch (error) {
      console.log(error);
      
    }
  }
  function getCatIdndName(id,name) {
    setCatId(id)
    setCatName(name)
  }
  useEffect(() => {
    getAllCategories()
  }, [])  
  return (
    <>
    <div className="mb-10">
        <h3 className="text-2xl my-4 text-center text-main font-semibold">All Categories</h3>
        {categories.length?(<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {categories.map((cat)=> <RecentCategory getCatIdndName={getCatIdndName} key={cat._id} cat={cat}/>)}
        </div>):(<div className="flex justify-center pt-10">
          <Loading />
        </div>)}
        
    </div>
    <RelatedSubCategories catName={catName} catId={catId}/>
    </>
  )
}
