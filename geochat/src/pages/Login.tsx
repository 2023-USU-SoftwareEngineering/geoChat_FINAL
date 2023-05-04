import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/Logo.png';
import "../index.css";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e: {
    target: any; preventDefault: () => void; }) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      setErr(true);
    } 

  } 
    return (
      <div className="formContainer">   
      <div className="formWrapper">
        <img src={logo} alt="GeoChat logo"></img>
        <span className="title"> Login </span>
        <form onSubmit={ handleSubmit }>
            <input type="email" placeholder="email"></input>
            <input type="password" placeholder="password"></input>
            <button> Login </button>
            { err && <span> Oops! Something went wrong </span>}
        </form> 
        <p> Don't have an account? <Link to="/register"> Sign Up </Link> </p>
      </div>
      </div>
    )
  }

export default Login;
