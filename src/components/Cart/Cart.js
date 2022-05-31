import React from 'react';
import './Cart.css'
const Cart = (prop) => {
    const cart = prop.cart;
    const total = cart.reduce((total, prd) => total + prd.price*prd.quantity, 0);
    let shipping = 12.99;
    const formatNumber = num => {
        const pricision = num.toFixed(2);
        return Number(pricision);
    }
    if (total > 35) {
        shipping = 0;
    } else if (total > 0) {
        shipping = 4.99;
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    return (
       <div>
           <h4 className='text-primary'>Ordersummary</h4>
           <p>Items Ordered:{cart.length}</p>
           <p>Product Price:{formatNumber(total)}</p>
           <p><small>shipping Cost:{shipping}</small></p>
           <p><small>Tax + VAT: {tax}</small></p>
           <p>Total Price:{grandTotal}</p>
           {
               prop.children
           }
       </div>
    );
};

export default Cart;