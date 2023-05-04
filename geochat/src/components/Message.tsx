import "../index.css";
import avatar from "../assets/default_avatar.jpg"
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const Message = ({ message }: { message: any }) => {
  const { currentUser } = useContext(AuthContext);
  const data = useContext(ChatContext)?.data;

  return (
    <div className="message">
      <div className="messageinfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data?.user.photoURL} />
      </div>
      <div className="messagecontent">
        {message.text && <p>{message.text}</p>}
        {message.location && (
          <div style={{ height: '200px', width: '100%' }}>
            <MapContainer center={[message.location.lat, message.location.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[message.location.lat, message.location.lng]} />
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
