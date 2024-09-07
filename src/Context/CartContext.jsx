import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { userContext } from './UserContext';
import { Bounce,toast } from 'react-toastify';

export let cartContext = createContext();



export default function CartContextProvider({children}) {
    let {userData} = useContext(userContext);
    
    const [cart, setCart] = useState(null)
    const [wishList, setWishList] = useState(null)
    const [wishListProducts, setWishListProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [QuantityloadingPlus, setQuantityloadingPlus] = useState(false)
    const [QuantityloadingMinus, setQuantityloadingMinus] = useState(false)
    let headers = {
        token : localStorage.getItem('userToken')
    }
    async function addToCart(productId) {
        try {
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
                productId
            },{
                headers
            })
            setCart(data);
            toast.success(data.message, {
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
        } catch (error) {
            console.log(error);
        }
    }

    async function getCartItems() {
        try {
            setLoading(true)
            let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                headers
            })
            setCart(data);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    async function deleteCartItem(productId) {
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                headers
            })
            setCart(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function clearCart() {
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers
            })
            setCart(null);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateProductQuantityM(productId,count) {
        setQuantityloadingMinus(true)
        if (count>0) {
            try {
                let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                    count
                },{
                    headers
                })
                setCart(data);
            } catch (error) {
                console.log(error);
            }finally{
                setQuantityloadingMinus(false)
            }
        }  
    }
    async function updateProductQuantityP(productId,count) {
        setQuantityloadingPlus(true)
        try {
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                count
            },{
                headers
            })
            setCart(data);
        } catch (error) {
            console.log(error);
        }finally{
            setQuantityloadingPlus(false)
            }
    }

    async function checkOut(ShippingAddress) {
        try {
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5174`,{
                ShippingAddress
            },{
                headers
            })
        window.location.href = data.session.url;
        } catch (error) {
            console.log(error);
            
        }
    }

    async function addToWishList(productId) {
        try {
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
                productId
            },{
                headers
            })
            toast.success(data.message, {
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
            getWishListItems()
        } catch (error) {
            console.log(error);
            
        }
    }
    async function removeFromWishList(productId) {
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
                headers
            })
            toast.success(data.message, {
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
            getWishListItems()
        } catch (error) {
            console.log(error);
        }
    }
    async function getWishListItems() {
        setLoading(true);
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers
            });
            const newWishListProducts = data.data.map(pro => pro.id);
            setWishListProducts(newWishListProducts);
            setWishList(data); 
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        }



    useEffect(() => {
        if (userData) {
            getCartItems();
            getWishListItems();
        }
    }, [userData]);
    
    

    return (<>
        <cartContext.Provider value={{QuantityloadingPlus, QuantityloadingMinus, wishListProducts, setWishListProducts, wishList, setWishList, getWishListItems, removeFromWishList, addToWishList, clearCart, checkOut, updateProductQuantityM,updateProductQuantityP, deleteCartItem, getCartItems, addToCart, cart, setCart, loading, setLoading}}>
                {children}
            </cartContext.Provider>
        </>
    )
}