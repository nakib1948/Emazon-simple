
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './Login/Login';
import Shipment from './Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './PrivateRoute/PrivateRoute';
export const UserContext=createContext();

function App() {
  
  const [loggedInUser,setLoggedInUser]=useState({});

  return (
    <UserContext.Provider  value={[loggedInUser,setLoggedInUser]}>
       
      <Header></Header>
      
      <Routes>
       
       <Route path='/shop' element={<Shop/>}/>

       <Route path='/review' element={<Review/>}/>
       <Route path='/inventory' element={<Inventory/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/shipment' element={<PrivateRoute><Shipment/></PrivateRoute>}/>

       <Route exact path='/' element={<Shop/>}/>
       <Route path='/product/:productKey' element={<ProductDetails/>}/>
       <Route path='*' element={<Notfound/>}/>
        
      </Routes>
      
      




    </UserContext.Provider>
  );
}

export default App;
