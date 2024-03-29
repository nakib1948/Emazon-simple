import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
const ProductDetails = () => {
    const {productKey}=useParams();
    const [product,setProduct]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/product/' + productKey)
        .then(res=>res.json())
        .then(data=>setProduct(data[0]))
    },[productKey])
    console.log(product)
    return (
        <div>
            <h1>Your Product Datails</h1>
            <Product addtoCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;