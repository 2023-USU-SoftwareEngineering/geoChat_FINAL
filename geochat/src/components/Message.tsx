import "../index.css";
import avatar from "../assets/default_avatar.jpg"
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({message}: {message: any}) => {
  const { currentUser } = useContext(AuthContext);
  const data = useContext(ChatContext)?.data;

  console.log(message.senderId === currentUser.id)

    return (
      <div className="message">
        <div className="messageinfo">
          <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data?.user.photoURL} />
        </div>
        <div className="messagecontent">
          <p> {message.text} </p>
          {message.map && <img />} 
          {/* add map */}
        </div>
      </div>
    )
  }

export default Message;
