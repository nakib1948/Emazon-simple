import React from 'react';
import './Product.css'; 
import svg from '../../images/cart.svg';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Product = (props) => {
    const {img,name,seller,price,stock,key}=props.product;
    return (
       
        
     <Card className='display'  style={{ width: '20rem',marginLeft:'10px' ,marginTop:'10px',borderRadius:'20px',paddingRight:'20px',paddingLeft:'20px'}}>
      <Card.Img variant="top" style={{borderRadius:'10px',marginTop:'5px'}} src={img} height='220px' />
      <Card.Body>
        <Card.Title><h6 className='product-name'><Link to={"/product/"+key}>{name}</Link> </h6></Card.Title>
        
        <Card.Text>
        <p><small>by: {seller}</small></p>
        </Card.Text>
        <Card.Text>
        <p>${price}</p>
        </Card.Text>
        <p><small>Only {stock} left in stock - Order soon</small></p>
        <Card.Text>
        {props.addtoCart && <button className='main-button' onClick={()=>props.handleAddProduct(props.product)}>
                <img src={svg}/> add to cart
                </button>}
        </Card.Text>
      </Card.Body>
    </Card>

    );
};

export default Product;