import React from 'react';
import './Cart.css';
const Cart = (props) => {
    const cart=props.cart;
    const total=cart.reduce((total,prd)=>total+prd.price*prd.quantity||1,0);
    let shipping=0;
    if(total<=35 && total>15){
        shipping=4.99;
    }
    else if(total>0){
    shipping=12.99;
    }
     const tax=Number((total/10).toFixed(2)); 
     const grandtotal=Number((total + shipping + tax).toFixed(2));
    
    return (
        <div>
            <h4 className='text-danger'>Order summary</h4>
            <p>Items Orderd:{cart.length}</p>
            <p>Product Price:{total}$</p>
            <p><small>Shipping Cost:{shipping}$</small></p>
            <p><small>Tax + VAT: {tax}$</small></p>
            <p>Total Price: {grandtotal}$</p>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;