import React, { useEffect, useState } from 'react';
import { getStoredCart,deleteFromDb, clearTheCart } from '../../utilities/fakedb';
import fakeData from '../../fakeData/products.json';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import {  useNavigate } from "react-router-dom";
const Review = () => {
    const [cart,setCart]=useState([]);
    const removeProduct=(productKey)=>{
        const newCart=cart.filter(pd => pd.key!== productKey);
        setCart(newCart);
        deleteFromDb(productKey);
    }
    const navigate = useNavigate();
    const handleProceedCheckout=()=>{
        navigate("/shipment");
    }

    useEffect(()=>{
        const savedCart=getStoredCart();
        const productKeys=Object.keys(savedCart)
        const cartProducts=productKeys.map(key=>{
            const product= fakeData.find(pd=>pd.key===key);
            product.quantity=savedCart[key];
            return product;
        });
        setCart(cartProducts);
        
    },[])
    return (

        <div className='shop-container'>
        <div className="product-container">
      
        <h1>Cart Items:{cart.length}</h1>
            {
                cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
            }
       
        </div>

        <div className="cart-container">
           <Cart cart={cart}>
            <button onClick={handleProceedCheckout} className='main-button'>Proceed CheckOut</button>

           </Cart>
        </div>
       
    </div>
    
    );
};

export default Review;