import React, { useContext } from 'react';
import { Route,Navigate } from 'react-router-dom';
import { UserContext } from '../App';

const PrivateRoute = ({ children}) => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    if (loggedInUser.email ) {
        return children
      }
        
      return <Navigate to="/login" />
    
};

export default PrivateRoute;