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
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

function MapPin({ setPinLocation }: { setPinLocation: (location: any) => void }) {  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPinLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useMapEvents({
    click: (e) => {
      setPinLocation(e.latlng);
    },
  });

  return (
    <>
      <button onClick={getUserLocation}>Get My Location</button>
    </>
  );
}

function Input() {
  const [text, setText] = useState('');
  const [map, setMap] = useState(false);
  const [pinLocation, setPinLocation] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const data = useContext(ChatContext)?.data;

  const handleSend = async () => {
    if (map && pinLocation) {
      // Store the map data in Firestore
      const mapData = {
        id: uuidv4(),
        senderId: currentUser.uid,
        date: Timestamp.now(),
        location: pinLocation,
      };

      await updateDoc(doc(collection(db, 'chats'), data && data.chatId), {
        messages: arrayUnion(mapData),
      });
    } else {
      // Store the text message in Firestore
      await updateDoc(doc(collection(db, 'chats'), data && data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

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
    setMap(false);
    setPinLocation(null);
  };

  const handlePinClick = () => {
    setMap(!map);
  };

  return (
    <div className="input">
      <input type="text" placeholder="Say hello!" value={text} onChange={(e) => setText(e.target.value)} />
      <img src={pin} alt="pin icon" onClick={handlePinClick} />
        <button onClick={handleSend}>Send</button>
    </div>
);
}

export default Input;