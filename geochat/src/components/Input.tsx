import "../index.css";
import Message from "./Message";
import pin from "../assets/pin_icon.png"
import upload from "../assets/upload_icon.png"

function Input() {  
    return (
        <div className="input">
        <input type="text" placeholder="Say hello!" />
            <img src={pin} alt="pin icon" />
            <input type="file" style={{display:"none"}} />
            <label htmlFor="file">
            <img src={upload} alt="upload icon" />
            </label>
            <button> Send </button>
        </div>
    )
  }

export default Input;



