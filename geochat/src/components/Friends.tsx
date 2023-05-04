import "../index.css";
import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Friends() {  
  const [chats, setChats] = useState<any>([]);
  const { currentUser } = useContext(AuthContext);
  const dispatch = useContext(ChatContext)?.dispatch;

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    console.log(chats);
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u: any) => {
    if(dispatch != null){
      dispatch({type:"CHANGE_USER", payload: u})
    }
  }

  return (
    <div className="friends">
      {Object.entries(chats)?.map((chat: any) => (
        <div className="friendchat" key={chat[0]} onClick={()=> {handleSelect(chat[1].userInfo)} }>
          <img src={chat[1].userInfo.photoURL} alt="User profile picture" />
          <span>{chat[1].userInfo.displayName}</span>
        </div>
      ))}
    </div>
  );
}

export default Friends;
