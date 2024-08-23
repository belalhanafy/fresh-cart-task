import React, { useContext, useState } from "react";
import style from "./Navber.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";
export default function Navber() {
  const [isOpen, setIsOpen] = useState(false);
  let { userData, setUserData } = useContext(userContext);
  let { cart, wishList } = useContext(cartContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <>
      <nav className='shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] py-4 bg-gray-200 sticky z-50 top-0 inset-x-0 capitalize"'>
        <div className="container mx-auto lg:flex justify-between items-center px-4 text-gray-500">
          <div className="flex justify-between lg:justify-normal items-center space-x-3">
            <div>
              <NavLink to={"/home"}>
                <img className="w-[120px]" src={logo} alt="" />
              </NavLink>
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black focus:outline-none"
              >
                <i
                  className={
                    isOpen
                      ? "fa-solid fa-xmark text-2xl"
                      : "fa-solid fa-bars text-2xl"
                  }
                ></i>
              </button>
            </div>
            {userData && (
              <ul className="hidden lg:flex flex-row space-x-4">
                <li>
                  <NavLink to={"/home"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={"/categories"}>Categories</NavLink>
                </li>
                <li>
                  <NavLink to={"/brands"}>Brands</NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>Orders</NavLink>
                </li>
              </ul>
            )}
          </div>

          <div>
            <ul className="hidden lg:flex flex-col items-center md:flex-row space-x-4">
              {userData ? (
                <>
                  <li>
                    <NavLink className="" to="/cart">
                      <i className="fa-solid fa-cart-shopping mr-2"></i>
                      <span>{cart ? cart.numOfCartItems : 0}</span>
                    </NavLink>
                  </li>
                  <li>
                      <NavLink to="/wishList">
                        <i className="fa-solid fa-heart mr-2" />
                        <span>{wishList ? wishList.count : 0}</span>
                      </NavLink>
                    </li>
                  <li>
                    <span
                      onClick={logOut}
                      className="text-gray-500 cursor-pointer">
                      Logout
                      <i className="fa-solid fa-arrow-right-from-bracket ml-1"></i>
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="login"><i className="fa-solid fa-arrow-right-to-bracket mr-1"></i> Login</NavLink>
                  </li>
                  <li>
                    <NavLink to=""><i className="fa-solid fa-user mr-1"></i> Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div
            className={`flex lg:hidden px-4 duration-500 overflow-hidden ${
              isOpen ? "dropdown-enter-active" : "dropdown-leave-active"
            }`}
          >
            <ul className="flex flex-col items-start space-y-4 py-4">
              {userData && (
                <>
                  <li className="cursor-pointer">
                    <NavLink
                      onClick={() => {
                        handleLinkClick();
                      }}
                      className="p-2 text-black text-lg md:text-xl font-bold"
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="cursor-pointer">
                    <NavLink
                      onClick={() => {
                        handleLinkClick();
                      }}
                      className="p-2 text-black text-lg md:text-xl font-bold"
                      to="/products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="cursor-pointer">
                    <NavLink
                      onClick={() => {
                        handleLinkClick();
                      }}
                      className="p-2 text-black text-lg md:text-xl font-bold"
                      to="/categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="cursor-pointer">
                    <NavLink
                      onClick={() => {
                        handleLinkClick();
                      }}
                      className="p-2 text-black text-lg md:text-xl font-bold"
                      to="/brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="cursor-pointer">
                    <NavLink
                      onClick={() => {
                        handleLinkClick();
                      }}
                      className="p-2 text-black text-lg md:text-xl font-bold"
                      to="/orders"
                    >
                      Orders
                    </NavLink>
                  </li>
                </>
              )}
              <ul className="px-2 flex flex-row space-x-5 font-bold">
                {userData && (
                  <>
                    <li>
                      <NavLink
                        onClick={() => {
                          handleLinkClick();
                        }}
                        className=""
                        to="/cart"
                      >
                        <i className="fa-solid fa-cart-shopping mr-2"></i>
                        <span>{cart ? cart.numOfCartItems : 0}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => {
                          handleLinkClick();
                        }}
                        to="/wishList">
                        <i className="fa-solid fa-heart mr-2" />
                        <span>{wishList ? wishList.count : 0}</span>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>

              <ul className="px-2 flex flex-row space-x-5 font-bold">
                {userData ? (
                  <li>
                    <span
                      onClick={() => {
                        logOut();
                        handleLinkClick();
                      }}
                      className="text-gray-500 cursor-pointer"
                    >
                      Logout
                      <i className="fa-solid fa-arrow-right-from-bracket ml-1"></i>
                    </span>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink onClick={handleLinkClick} to="login"><i className="fa-solid fa-arrow-right-to-bracket mr-1"></i> Login</NavLink>
                    </li>
                    <li>
                      <NavLink onClick={handleLinkClick} to=""><i className="fa-solid fa-user mr-1"></i> Register</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

