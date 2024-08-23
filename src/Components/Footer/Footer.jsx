import React from "react";
import style from "./Footer.module.css";
import amazon from "../../assets/images/amazon.png";
import ae from "../../assets/images/ae.png";
import paypal from "../../assets/images/paypal.png";
import masterCard from "../../assets/images/mastercard.png";
import apple2 from "../../assets/images/apple.png";
import googlePlay from "../../assets/images/googleplay.png";
export default function Footer() {
  return (
    <>
      <div className="bg-slate-200 fixed-bottom shadow-[0_0_5px_2px_rgba(0,0,0,0.3)]">
        <div className="container p-5 mx-auto">
          <h3 className="text-xl text-center lg:text-left mb-2">
            Get The FreshCart App
          </h3>
          <p className="text-center lg:text-left ntext-gray-500">
            We Will Send You A Link, Open It On Your Phone To Download The App
          </p>
          <div className="p-2">
            <div className="flex flex-col lg:flex-row gap-5 py-5 border-b border-gray-300">
              <input
                className="lg:w-5/6 w-full rounded-lg outline-none border border-gray-400 text-lg px-3"
                type="email"
                name="email"
                placeholder="Email.."
              />
              <button
                className="btn lg:w-1/6 w-full bg-main text-white py-2 rounded-lg"
                type="submit"
              >
                Share App Link
              </button>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between py-3 border-b border-gray-300">
              <div className="flex flex-col lg:flex-row items-center gap-2 ">
                <p className="text-center">Payment Partners</p>
                <div className="flex items-center gap-4">
                  <img
                    className="sm:w-[50px] w-[40px] sm:h-[40px] h-[40px]"
                    src={amazon}
                    alt=''
                  />
                  <img
                    className="sm:w-[50px] w-[40px] sm:h-[40px] h-[40px]"
                    src={ae}
                    alt=''
                  />
                  <img
                    className="sm:w-[50px] w-[40px] sm:h-[40px] h-[40px]"
                    src={masterCard}
                    alt=''
                  />
                  <img
                    className="sm:w-[50px] w-[40px] sm:h-[40px] h-[40px]"
                    src={paypal}
                    alt=''
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2 mt-5 sm:mt-0">
                <p className="text-center">Get deliveries with FreshCart</p>
                <div className="flex items-center gap-2">
                  <img
                    className="sm:w-[90px] w-[70px] h-[30px]"
                    src={apple2}
                    alt=''
                  />
                  <img
                    className="sm:w-[100px] w-[80px] h-[45px]"
                    src={googlePlay}
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>

          <ul className="text-center flex flex-col gap-5 icons mt-2">
            <li className="space-x-4 text-black">
              <i className="text-xl fab fa-facebook-f _icon_1izea_1" />
              <i className="text-xl fab fa-linkedin-in _icon_1izea_1" />
              <i className="text-xl fab fa-youtube _icon_1izea_1" />
              <i className="text-xl fab fa-twitter _icon_1izea_1" />
              <i className="text-xl fab fa-instagram _icon_1izea_1" />
            </li>
            <div className="font-semibold">Copyright <i className="text-main fa-regular fa-copyright"></i> 2024 | Belal Hanafy</div>
          </ul>
        </div>
      </div>
    </>
  );
}
