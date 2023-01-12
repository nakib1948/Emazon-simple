import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/shoplogo.jpg'
import './Header.css';
const Header = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    return (
        <div className='header'>
      
         <nav>
            <img src={logo} height='40px' width='60px' style={{borderRadius:'5px'}} alt="" />
            <input type='text' placeholder='Search..' style={{borderRadius:'5px',marginLeft:'20px',marginRight:'20px'}} ></input>
            <Link to="/Shop">Shop</Link>
            <Link to="/Review">Order Review</Link>
            <Link to="/Inventory">Manage Inventory</Link>
            <button onClick={()=>setLoggedInUser({})}> Log Out</button>
        </nav>
        </div>
    );
};

export default Header;