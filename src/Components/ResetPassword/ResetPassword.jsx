import React, { useEffect, useState } from 'react'
import style from './ResetPassword.module.css'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

export default function ResetPassword() {
  let { email } = useParams();
  const [loading , setLoading] = useState(false)
  const [ newPassword, setNewPassword] = useState(null)
  let navigate = useNavigate()
  useEffect(() => {
    document.title = "reset Password"
  }, [])
  async function resetPassword(values) {
    try {
      setNewPassword(values.password)
      setLoading(true)
      let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
        email,
        newPassword
      })
      console.log(data);
      toast.success('password reseted successfully', {
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
      navigate('/login')
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  }
  let validationSchema = Yup.object().shape({  
    password: Yup.string()
      .min(8, 'Password is too short - should be at least 8 characters.')
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z\d]).{8,}$/, 
        'Password must start with a capital letter, contain at least one digit, and be 8-20 characters long.')
      .required('Password is required'),
  });
  
  let formik = useFormik({
    initialValues:{
      password:'',
    },
    validationSchema,
    onSubmit: resetPassword
  });
  return (
    <>
      <div className="w-1/2 mx-auto mt-8">
        <h2 className="text-3xl mb-5 font-semibold text-emerald-500">
          reset Password:
        </h2>
        <form onSubmit={formik.handleSubmit}>
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
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter New password:
            </label>
            {formik.touched.password && formik.errors.password ? (
              <div className="p-2 my-4 text-lg rounded-lg bg-red-50 dark:text-red-400" role="alert">
                <span className="text-red-600 font-medium">{formik.errors.password}</span>
              </div>
            ) : null}
          </div>


          {!loading?<button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            Reset Password
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
