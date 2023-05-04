import "../index.css";
import Message from "./Message";
import Input from "./Input";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";

function Chat() {  
  const data = useContext(ChatContext)?.data;

    return (
        <div className="chat"> 
          <div className="chatinfo">
            <span> {data && data.user.displayName ? data.user.displayName : ""} </span>
          </div>
          < Messages />
          < Input />
          </div>
    )
  }

export default Chat;
