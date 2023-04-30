import logo from '../assets/GeoChatLogo.png';
import "../index.css";

function Login() {  
    return (
      <div className="formContainer">   
      <div className="formWrapper">
        <img src={logo} alt="GeoChat logo"></img>
        <span className="title"> Login </span>
        <form>
            <input type="email" placeholder="email"></input>
            <input type="password" placeholder="password"></input>
            <button> Login </button>
        </form> 
        <p> Don't have an account? Sign Up </p>
      </div>
      </div>
    )
  }

export default Login;
