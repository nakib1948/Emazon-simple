import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../../fakeData/products.json'
import Product from '../Product/Product';
const ProductDetail = () => {
    const {productkey}=useParams()
    const product=products.find(pd => pd.key===productkey)
    console.log(product);
    return (
        <div>
            <h1>{productkey} detail coming soon</h1>
            <Product addtocart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;