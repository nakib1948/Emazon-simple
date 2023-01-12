import React, { useState,useEffect } from 'react';
import { addToDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { getStoredCart,deleteFromDb } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
   
    const [products,setProducts]=useState([]);
    const [cart,setCart]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])

    useEffect(()=>{
        const savedCart=getStoredCart();
        const productKeys=Object.keys(savedCart)
       if(products.length>0){ const cartProducts=productKeys.map(key=>{
            const product= products.find(pd=>pd.key===key);
            product.quantity=savedCart[key];
            return product;
        });
        setCart(cartProducts);}
        
    },[products])

    const handleAddProduct=(product)=>{

        const toBeAddedKey=product.key;
        const sameProduct= cart.find(pd=>pd.key===toBeAddedKey);
        let count=1;
        let newCart;
        if(sameProduct)
        {
            count=sameProduct.quantity + 1;
            sameProduct.quantity=count;
            const others=cart.filter(pd=> pd.key!==product.key);
            newCart=[...others,sameProduct];
        }
        else{
            product.quantity=1;
            newCart=[...cart,product];
        }
        setCart(newCart);
        addToDb(product.key);
    }

    return (
        <div className='shop-container'>
            <div className="product-container"  style={{display:'grid',gridTemplateColumns:'auto auto auto'}} >

               {
                 products.map(pd=> <Product key={pd.key} addtoCart={true} handleAddProduct={handleAddProduct} product={pd}> </Product> )
                 
               }
            
            
            </div>

            <div className="cart-container">
               <Cart cart={cart}>
               <Link to='/review'>
                <button className='main-button'>Review order</button>
               </Link>

               </Cart>
              
            </div>
           
        </div>
    );
};

export default Shop;