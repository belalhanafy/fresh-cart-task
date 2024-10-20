import React, { useEffect, useState } from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Pagination, Stack } from "@mui/material";
import { green } from '@mui/material/colors';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState(0);
  const [currPage, setcurrPage] = useState(0);
  const color = green[500];

  async function getAllProducts() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${currPage}`);
      setProducts(data.data);
      setPages(data.metadata.numberOfPages)
      setFilteredProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
    document.title = "products"
  }, [currPage]);
  const handleChange = (event, value) => {
    setcurrPage(value);
    window.scrollTo(0, 0)
  };
  useEffect(() => {
    const searchTermLower = searchTerm.trim().toLowerCase();
    const filtered = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchTermLower)
      );
    });
    setFilteredProducts(filtered);
  }, [searchTerm]);

  return (
    <>
      <h3 className="text-2xl my-4 text-center text-main font-semibold">
        All Products
      </h3>
      <form className="my-10 shadow-md">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
        </div>
      </form>
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10'>
          {filteredProducts.map((pro) => <RecentProduct key={pro.id} pro={pro} />)}
        </div>
      ) : searchTerm.length?(
        <div className='flex justify-center mt-24'>
          <p className="text-3xl">No products found</p>
        </div>
      ) : (<div className="flex justify-center pt-10">
        <Loading />
      </div>)}
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
