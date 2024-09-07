import React, { useContext, useEffect, useState } from "react";
import style from "./Register.module.css";
import * as Yup from 'yup';
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

export default function Register() {
  const [apiError, setApiError] = useState(null)
  const [loading , setLoading] = useState(false)
  const {userData} = useContext(userContext)
  console.log(userData);
  
  let navigate = useNavigate()

  function handleShowPassword() {
    let passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
        }
  }
  function handleShowrePassword() {
    let passwordInput = document.getElementById("rePassword");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
        }
  }
  async function register(values) {
    try {
      setLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
      navigate('/login')
    } catch (error) {
      setApiError(error.response.data.message);
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    if (userData) {
      navigate('/home')
    }
    document.title = "register"
  }, [userData]);
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name is too short - should be at least 2 characters.')
      .max(50, 'Name is too long - should not exceed 50 characters.')
      .required('Name is required'),
    
    email: Yup.string()
      .email('Invalid email address format')
      .required('Email is required'),
  
    password: Yup.string()
      .min(8, 'Password is too short - should be at least 8 characters.')
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z\d]).{8,}$/, 
        'Password must start with a capital letter, contain at least one digit, and be 8-20 characters long.')
      .required('Password is required'),
  
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Password confirmation is required'),
  
    phone: Yup.string()
      .matches(/^(002|\+2)?01[0125]\d{8}$/, 
        'Invalid phone number format. Must be an Egyptian number starting with (+20) or (002) followed by 01.')
      .required('Phone number is required')
  });
  
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema,
    onSubmit: register
  });
  return (
    <>
      <div className="w-1/2 mx-auto mt-8">
        <h2 className="text-3xl mb-5 font-semibold text-emerald-500">
          Register Now:
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError&& <div className="p-2 my-4 text-lg rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span className="text-red-600 font-medium">{apiError}</span>
          </div>}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your name:
            </label>
            {formik.touched.name && formik.errors.name ? (
              <div className="p-2 my-4 text-lg rounded-lg bg-red-50 dark:text-red-400" role="alert">
                <span className="text-red-600 font-medium">{formik.errors.name}</span>
              </div>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your email:
            </label>
            {formik.touched.email && formik.errors.email ? (
              <div className="p-2 my-4 text-lg rounded-lg bg-red-50 dark:text-red-400" role="alert">
                <span className="text-red-600 font-medium">{formik.errors.email}</span>
              </div>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <span><i onClick={handleShowPassword} className="fa-regular fa-eye absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer"></i></span>
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your password:
            </label>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="p-2 my-4 text-lg rounded-lg bg-red-50 dark:text-red-400" role="alert">
              <span className="text-red-600 font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              
            />
            <span><i onClick={handleShowrePassword} className="fa-regular fa-eye absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer"></i></span>

            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter rePassword:
            </label>
          </div>
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="p-2 my-4 text-lg rounded-lg bg-red-50 dark:text-red-400" role="alert">
              <span className="text-red-600 font-medium">{formik.errors.rePassword}</span>
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your phone:
            </label>
            {formik.touched.phone && formik.errors.phone ? (
              <div className="p-2 my-4 text-lg rounded-lg bg-red-50 dark:text-red-400" role="alert">
                <span className="text-red-600 font-medium">{formik.errors.phone}</span>
              </div>
            ) : null}
          </div>

          <div className="my-3">Already have an account? <Link className="text-emerald-600 hover:underline " to="/login">Sign In</Link></div>

          {!loading?<button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            Submit
          </button>:<button
            type="button"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            <i className="fas fa-spinner fa-spin"></i>
          </button>}
          
          
        </form>
      </div>
    </>
  );
}
