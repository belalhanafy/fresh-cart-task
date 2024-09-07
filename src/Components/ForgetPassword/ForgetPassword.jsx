  import React, { useState } from 'react'
  import style from './ForgetPassword.module.css'
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  import axios from "axios";
  import { Link, useNavigate } from 'react-router-dom';
  import { Bounce, toast } from 'react-toastify';

  export default function ForgetPassword() {
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate();


    async function forgetPassword(values) {
      try {
        setLoading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
        toast.success('reset code send successfully to your email', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        navigate(`/verifyResetCode/${values.email}`)
      } catch (error) {
        toast.error('entered email is wrong or somthing went wrong please try again', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }finally{
        setLoading(false)
      }
    }
    let validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address format')
        .required('Email is required'),
    });
    let formik = useFormik({
      initialValues:{
        email:'',
        password:'',
      },
      validationSchema,
      onSubmit: forgetPassword
    });
    return (
      <>
        <div className="w-1/2 mx-auto mt-8">
          <h2 className="text-3xl mb-5 font-semibold text-emerald-500">
            Forget Password:
          </h2>
          <form onSubmit={formik.handleSubmit}>
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


            {!loading?<button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              Send Reset Code
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