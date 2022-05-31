import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import '../Header.css';
const Header = () => {
    return (
        <div className="header">
           <img src={logo} alt=""></img>
           <nav class="nav">
           <Link to="/shop" style={{marginLeft:"300px"}}>Shop</Link>
           <Link to="/review">Order</Link>
           <Link to="/Inventory">Manage Inventory</Link>
            </nav>
        </div>
    );
};

export default Header;