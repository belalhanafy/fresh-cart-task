import React, { useRef, useState } from 'react'
import style from './VerifyResetCode.module.css'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Bounce,toast } from 'react-toastify';

export default function VerifyResetCode() {
  let { email } = useParams();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errormessage , setErrorMessage] = useState('')
  const [sendAnotherCode , setSendAnotherCode] = useState(false)
  const navigate = useNavigate();


  const inputsRef = useRef([]);

  // Handle code input with automatic focus on the next field
  function handleCodeChange(index, value) {
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }

    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);

    // Move to next input field
    if (value && index < code.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  }

  async function SendAnotherResetCode() {
    try {
      setLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{
        email
      })
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
      setSendAnotherCode(false)
      setErrorMessage('')
      setCode(["", "", "", "", "", ""])
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
      setSendAnotherCode(true)
    }finally{
      setLoading(false)
    }
  }
  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const resetCode = code.join("");
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode: resetCode,
      });
      console.log(data);
      setCode(["", "", "", "", "", ""])
      setSendAnotherCode(false)
      navigate(`/resetPassword/${email}`)
    } catch (error) {
      setSendAnotherCode(true)
      setErrorMessage('entered code is wrong or somthing wrong happened please try again or click on send another code')
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    {!loading ? (<div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Check your email</h2>
        <p className="mb-4 text-gray-600">
          Please enter your 6-digit code.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </div>
          {errormessage && (<div className="p-2 my-4 text-lg rounded-lg bg-red-50 dark:text-red-400" role="alert">
                <span className="text-red-600 font-medium">{errormessage}</span>
              </div>)}
          {loading ? (
            <button
              type="button"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              Verify
            </button>
          )}
        </form>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <NavLink to={'/login'} className={'hover:underline'}>
            Back to login
          </NavLink>
          {sendAnotherCode && (<button onClick={SendAnotherResetCode} className={'hover:underline'}>
              Send Another Code
          </button>)}

        </div>
      </div>
    </div>):<div className="flex justify-center pt-10">
          <Loading />
        </div>}
    </>
  );
}
