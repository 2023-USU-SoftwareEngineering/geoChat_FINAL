import "../index.css";
import profile_pic from "../assets/default_avatar.jpg"

function Friends() {  
    return (
      <div className="friends">
        <div className="friendchat">
          <img src={profile_pic} alt="User profile picture"></img>
            <span> USER NAME </span>
          </div>
        </div>
    )
  }

export default Friends;
