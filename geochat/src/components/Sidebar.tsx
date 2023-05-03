import "../index.css";
import Nav from "./nav";
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
