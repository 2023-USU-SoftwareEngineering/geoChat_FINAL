import "../index.css";
import Message from "./Message";
import pin from "../assets/pin_icon.png";
import upload from "../assets/upload_icon.png";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from 'uuid';

function Input() {
  const [text, setText] = useState('');
  const [geolocation, setGeolocation] = useState("");

  const { currentUser } = useContext(AuthContext);
  const data = useContext(ChatContext)?.data
  
  const getGeolocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setGeolocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setText(geolocation);
        },
        error => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    await updateDoc(doc(collection(db, 'chats'), data && data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

    // Update last message and date for both users
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data?.chatId + '.lastMsg']: {
        text,
      },
      [data?.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data?.user.uid), {
      [data?.chatId + '.lastMsg']: {
        text,
      },
      [data?.chatId + '.date']: serverTimestamp(),
    });

  };


  const handleSend = async () => {
      await updateDoc(doc(collection(db, 'chats'), data && data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

    // Update last message and date for both users
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data?.chatId + '.lastMsg']: {
        text,
      },
      [data?.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data?.user.uid), {
      [data?.chatId + '.lastMsg']: {
        text,
      },
      [data?.chatId + '.date']: serverTimestamp(),
    });

    setText('');

  };

  return (
    <div className="input">
      <input type="text" placeholder="Say hello!" value={text} onChange={(e) => setText(e.target.value)} />
      <img src={pin} alt="pin icon" onClick={getGeolocation} />
        <button onClick={handleSend}>Send</button>
    </div>
);
}
export default Input;