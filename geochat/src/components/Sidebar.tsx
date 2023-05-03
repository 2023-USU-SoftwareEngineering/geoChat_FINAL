import "../index.css";
import Nav from "./Nav";
import Friends from "./Friends";

function Sidebar() {  
    return (
      <div className="sidebar">
        < Nav />
        < Friends />
        
      </div>
    )
  }

export default Sidebar;
