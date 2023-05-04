import "../index.css";
import Message from "./Message";
import pin from "../assets/pin_icon.png"
import upload from "../assets/upload_icon.png"
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from 'uuid';

function Input() {  
    const [ text, setText] = useState("");
    const [map, setMap] = useState<any>();

    const { currentUser } = useContext(AuthContext);
    const data = useContext(ChatContext)?.data;

    const handleSend = async () => {
        if(map){

        }else{
            await updateDoc(doc(collection(db, "chats"), data && data.chatId), {
                messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            });

        }
//delete?
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data?.chatId + ".lastMsg"]:{
                text,
            },
            [data?.chatId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", data?.user.uid), {
            [data?.chatId + ".lastMsg"]:{
                text,
            },
            [data?.chatId + ".date"]: serverTimestamp()
        })

        setText("");
        setMap(null);
    }
  
    return (
        <div className="input">
        <input type="text" placeholder="Say hello!" value={text} onChange={e => setText(e.target.value)}/>
            <img src={pin} alt="pin icon" />
            <input type="file" style={{ display: "none" }} />
            <label htmlFor="file">
            <img src={upload} alt="upload icon" />
            </label>
            <button onClick={ handleSend }> Send </button>
        </div>
    )
  }

export default Input;