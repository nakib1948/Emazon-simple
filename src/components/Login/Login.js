
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase.config";
 
import { getAuth,updateProfile,signInWithEmailAndPassword ,createUserWithEmailAndPassword, signInWithPopup,signOut, GoogleAuthProvider } from "firebase/auth";
import { ControlPointDuplicateOutlined } from "@material-ui/icons";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
const app = initializeApp(firebaseConfig);

function Login() {
  const [newUser,setNewUser]=useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password:"",
    photo: "",
    error:''
  });
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  const history=useHistory();
  const location=useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const provider = new GoogleAuthProvider();
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser={
          isSignedIn:true,
          name:displayName,
          email:email,
          photo:photoURL
        }
        setUser(signedInUser);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then((res) => {
        const signedInUser={
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          success:false
        }
        setUser(signedInUser);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });

     
  };
  const handlechange=(event)=>{
    let isFormValid=true;

    if(event.target.name==='email')
    {
      isFormValid= /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name==="password")
    {
      const isPasswordValid=event.target.value.length>6;
      const passwordHasNumber=/\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if(isFormValid)
    {
      const newUserInfo={...user};
      newUserInfo[event.target.name]=event.target.value;
      setUser(newUserInfo);
    }
  }
  const handlesubmit=(event)=>{
    if(newUser && user.email && user.password)
    {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const newUserInfo={...user};
        newUserInfo.error='';
        newUserInfo.success=true;
        setUser(newUserInfo);
       
        updateUserName(user.name);
      })
      .catch((error) => {
        const newUserInfo={...user};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        setUser(newUserInfo);
      });
   
    }
    if(!newUser && user.email && user.password)
    {
      const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email, user.password)
    .then(res => {
    const newUserInfo={...user};
    newUserInfo.error='';
    newUserInfo.success=true;
    setUser(newUserInfo);
    setLoggedInUser(newUserInfo);
    history.replace(from);
    console.log('sign in user info',res.user);
  })
  .catch((error) => {
    const newUserInfo={...user};
    newUserInfo.error=error.message;
    newUserInfo.success=false;
    setUser(newUserInfo);
  });

    }
    
    event.preventDefault();

  }
  const updateUserName=name=>{
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log('user name updated successfully')
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div style={{textAlign:'center'}}>
     { user.isSignedIn ? <button onClick={handleSignOut}>sign out</button>:
     <button onClick={handleSignIn}>sign in</button>}
      {
        user.isSignedIn && 
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own authentication</h1>
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handlesubmit}>
       {  newUser && <input onBlur={handlechange} name="name" type="text" />}
        <br />
        <input type="text" name="email" onBlur={handlechange} placeholder="your Email address" required />
        <br />
        <input type="password" name="password" onBlur={handlechange} placeholder="Your Password" required />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {user.success &&  <p style={{color:'green'}}>user {newUser ? 'created':'Logged In'} successfully </p> }
    </div>
  );
}

export default Login;
