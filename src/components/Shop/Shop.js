import React, { useState,useEffect } from 'react';
import fakeData from '../../fakeData/products.json';
import { addToDb,getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import{Link} from 'react-router-dom';

import './Shop.css';
const Shop = () => {
   const first10=fakeData.slice(0,10);
   const[products,setProducts]=useState(first10);
   const [cart,setCart]=useState([]);
   //console.log(products.name);
   useEffect(()=>
   {
       const savedCart=getStoredCart();
       //console.log(savedCart);
       const productKeys=Object.keys(savedCart);
       const cartproduct=productKeys.map(key=>{
           const product=fakeData.find(pd=>pd.key===key);
           product.quantity=savedCart[key];
           return product;
       });
       setCart(cartproduct);
   },[])
   const handleADDProduct=(product)=>{
      const toBeAddedKey=product.key;
      const sameProduct=cart.find(pd=>pd.key===toBeAddedKey);
      let count=1;
      let newCart;
      if(sameProduct)
      {
          count=sameProduct.quantity + 1;
          sameProduct.quantity=count;
          const others=cart.filter(pd=>pd.key !==toBeAddedKey);
          newCart=[...others,sameProduct];
      }
      else{
          product.quantity=1;
          newCart=[...cart,product];
      }
      setCart(newCart);
       addToDb(product.key,count);
   }
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                products.map(pd=><Product addtocart={true} product={pd} handleADDProduct={handleADDProduct}> </Product>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
           <Link to='/review'> <button className='main-button'>review order</button> </Link>

                </Cart>
            </div>
        </div>
    );
};

export default Shop;