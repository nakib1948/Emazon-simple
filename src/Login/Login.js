
import { useNavigate } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import firebaseConfig from './Login.config';
import {updateProfile,signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut,getAuth, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../App';
const app = initializeApp(firebaseConfig);

function Login() {
  const navigate = useNavigate();

  const [newUser,setNewUser]=useState(false);
  const [user,setUser]=useState({
    isSignedIn:false,
    name:'',
    email:'',
    photo:'',
    error:'',
    success:false
    
  })
   
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const handleSignIn= ()=>{
    signInWithPopup(auth, provider)
    
    .then((result) => {

     const {displayName,photoURL,email}=result.user;
     console.log(displayName,email,photoURL);
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL

      }
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
      navigate('/shipment');
    
    }).catch((error) => {
      
    });
  }
  const handleSignOut=()=>
  {
    signOut(auth).then(() => {
      const signedInUser={
        isSignedIn:false,
        name:'',
        email:'',
        password:'',
        photo:'',
        

      }
      setUser(signedInUser);
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleSubmit=(e)=>
  {
      if(newUser && user.email && user.password)
      {
        createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const newUserInfo={...user};
        newUserInfo.error='';
        newUserInfo.success=true;
        setUser(newUserInfo);
        updateUserName(user.name);
        // ...
  })
  .catch((error) => {
   
    const errorMessage = error.message;
    const newUserInfo={...user};
        newUserInfo.error=errorMessage;
        newUserInfo.success=false;
        setUser(newUserInfo);
    // ..
  });
      }

      if(!newUser && user.email && user.password)
      {
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const newUserInfo={...user};
          newUserInfo.error='';
          newUserInfo.success=true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          navigate('/shipment');
          console.log('sign in user Info',userCredential.user);
          // ...
        })
        .catch((error) => {
         
          const errorMessage = error.message;
        const newUserInfo={...user};
        newUserInfo.error=errorMessage;
        newUserInfo.success=false;
        setUser(newUserInfo);
  });
      }
      e.preventDefault();
  }
  const handleBlur=(event)=>{
   let isFieldValid;
   const e=event.target;
   if(e.name==='email')
   {
     
      isFieldValid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value);
   }
   else if(e.name==='password')
   {
       isFieldValid=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.value);
   }
   if(isFieldValid)
   {
    const newUser={...user};
    newUser[e.name]=e.value;
    setUser(newUser);
   }
  }
  const updateUserName=name=>{
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
    
  }
  return (
    <div style={{textAlign:'center'}} >
       {
        user.isSignedIn ?<button onClick={handleSignOut}>Sign Out</button>:
          <button onClick={handleSignIn}>Sign In</button>
       }
       {
          user.isSignedIn && <div>
            <p>Welcome,{user.name}</p>
            <p>Your email:{user.email}</p>
            <img src={user.photo} alt="" />

          </div> 
       }

       <h1>Our own Authentication</h1>
       <input type="checkbox" onChange={()=>setNewUser(!newUser)} name='newUser' id="" />
       <label htmlFor="newUser">New User Sign Up</label>
       <form onSubmit={handleSubmit}>
       { newUser &&  <input type="text" name='name' onBlur={handleBlur} placeholder='Your name' required  />
       }
        <br />

        <input type="text" name='email' onBlur={handleBlur} placeholder='Your Email Address' required />

        <br />
        <input type="text" name='password' onBlur={handleBlur}  placeholder='Your Password' required />
        <br />
        <input type="submit" value={newUser? 'Sign Up' : 'Sign In'} />
       </form>
       <p style={{color:'red'}}>{user.error}</p>
       {
         user.success && <p style={{color:'green'}}>User {newUser ? 'Created':'Logged In'} Successfully</p>
       }

    </div>
  );
}

export default Login;
