import { useContext, useEffect, useState } from "react";
import "../index.css";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Messages() {  
  const [messages, setMessages] = useState<any>([]);
  const data = useContext(ChatContext)?.data;

  useEffect (() => {
    if(data != null){
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages)
      })
      return () => {
        unsub();
      }
  }
  }, [data?.chatId]);

    return (
      <div className="messages">
        {messages.map((m: any) => (
          <Message message={m} key={m.id}/>
        )) }
      </div>
    )
  }

export default Messages;
