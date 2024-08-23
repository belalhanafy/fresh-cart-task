import { createContext, useContext, useEffect, useState} from "react";

export let userContext = createContext();

import React from 'react'
import { useNavigate } from "react-router-dom";
import { cartContext } from "./CartContext";

export default function UserContextProvider({children}) {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
      if (localStorage.getItem('userToken')) {
        setUserData(localStorage.getItem('userToken'))
      }
    }, [])
  return (
    <>
        <userContext.Provider value={{userData,setUserData }}>
            {children}
        </userContext.Provider>
    </>
  )
}
