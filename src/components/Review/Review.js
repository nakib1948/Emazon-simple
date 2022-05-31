import React, { useEffect, useState } from 'react';
import {getStoredCart} from '../../utilities/fakedb'
import fakeData from '../../fakeData/products.json';
import Reviewitem from '../ReviewItem/Reviewitem';
import {deleteFromDb,clearTheCart} from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Review = () => {
    const [cart,setcart]=useState([]);
    const [orderPlaced,setorderPlaced]=useState(false);
    const history=useHistory()
    const removeProduct=(productkey)=>{
        console.log(productkey);
        const newCart=cart.filter(pd=>pd.key!==productkey)
        setcart(newCart);
        deleteFromDb(productkey);
    }
    const handleProceedCheckout=()=>{
       history.push('/Shipment');
    }
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
        setcart(cartproduct);
    },[])
    let thankyou;
    if(orderPlaced){
        thankyou=<img src={happyImage} alt=''></img>
}
    return (
        <div className='twin-container'>
        <div className='product-container'>
            <h1>Cart items:{cart.length}</h1>
            {
               
                cart.map(pd => <Reviewitem removeProduct={removeProduct} key={pd.key} product={pd}></Reviewitem>)
            }
            {
                thankyou
            }
        </div>
        <div>
            <Cart cart={cart}>
                <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
            </Cart>
        </div>

        </div>
    );
};

export default Review;