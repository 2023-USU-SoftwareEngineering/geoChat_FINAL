import "../index.css";
import logo from '../assets/GeoChatLogo.png';


function Nav() {  
    return (
      <div className="navbar">
        <img className="smalllogo" src={logo} alt="GeoChat logo"></img>
        <div className="userdisplay">
          <img src="" alt="" />
          <span className="navuser"> USER </span> 
          <button className="navbutton"> log out </button> 
        </div>        
      </div>
    )
  }

export default Nav;
