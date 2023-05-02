import logo from '../assets/Logo.png';
import "../index.css";

function Register() {  
    return (
      <div className="formContainer">   
      <div className="formWrapper">
        <img src={logo} alt="GeoChat logo"></img>
        <span className="title"> Register </span>
        <form>
            <input type="text" placeholder="display name"></input>
            <input type="email" placeholder="email"></input>
            <input type="password" placeholder="password"></input>
            <input type="file"/>
            <button> Sign Up </button>
        </form> 
        <p> Do you already have an account? Login </p>
      </div>
      </div>
    )
  }

export default Register;
