import "../index.css";
import Message from "./Message";
import Input from "./Input";
import Messages from "./Messages";

function Chat() {  
    return (
        <div className="chat"> 
          <div className="chatinfo">
            <span> USER NAME </span>
          </div>
          < Messages />
          < Input />
          </div>
    )
  }

export default Chat;
