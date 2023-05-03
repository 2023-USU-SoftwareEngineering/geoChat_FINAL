import "../index.css";
import logo from '../assets/Logo.png';
import { signOut } from "firebase/auth"
import { auth } from "../firbase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Nav() {  
  const { currentUser } = useContext(AuthContext);

    return (
      <div className="navbar">
         <div className="userdisplay">
          <img  src={currentUser.photoURL} alt="" />
          <h1> {currentUser.displayName} </h1> 
        </div>
          <div className="userdisplay">
          <button className="navbutton" onClick={() => signOut(auth)}> log out </button> 
        </div>        
      </div>
    )
  }

export default Nav;
