import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "axios";
import RecentProduct from "../RecentProduct/RecentProduct";
import Loading from "../Loading/Loading";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Pagination, Stack } from "@mui/material";
import { green } from '@mui/material/colors';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(0);
  const [currPage, setcurrPage] = useState(1);
  const color = green[500];
  async function getAllProducts() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${currPage}`
      );
      setProducts(data.data);
      setPages(data.metadata.numberOfPages)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllProducts();
    document.title = "home";
  }, [currPage]);
  const handleChange = (event, value) => {
    setcurrPage(value);
    window.scrollTo(900, 900)
  };
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <h3 className="text-2xl my-4 text-center text-main font-semibold">
        All Products
      </h3>
      {products.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
          {products.map((pro, index) => (
            <RecentProduct key={pro.id} pro={pro} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-32">
          <Loading />
        </div>
      )}
      <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }} spacing={2}>
        <Pagination count={pages} showFirstButton showLastButton onChange={handleChange} sx={{
          '.Mui-selected': {
            backgroundColor: color,
          },
          '.MuiPaginationItem-root': {
            '&:hover': {
              backgroundColor: color,
            },
          },
        }} />
      </Stack>
    </>
  );
}


{/* <nav aria-label="Page navigation example" className="mt-10 flex justify-center">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <p className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
              <span className="sr-only">Previous</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
              </svg>
            </p>
          </li>
          {Array.from({ length: pages }, (_, index) => (
            <li key={index}>
              <p className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                {index + 1}
              </p>
            </li>
          ))}

          <li>
            <p className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
              <span className="sr-only">Next</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
              </svg>
            </p>
          </li>
        </ul>
      </nav> */}