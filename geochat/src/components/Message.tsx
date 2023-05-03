import "../index.css";
import avatar from "../assets/default_avatar.jpg"

function Message() {  
    return (
      <div className="message">
        <div className="messageinfo">
           <img src={avatar} alt="" />
           <h6> just now </h6>
        </div>
        <div className="messagecontent">
          <p> hello </p>
          <img src="" />
        </div>
      </div>
    )
  }

export default Message;
