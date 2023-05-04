import "../index.css";
import Nav from "./Nav";
import Friends from "./Friends";
import Search from "./Search";

function Sidebar() {  
    return (
      <div className="sidebar">
        < Nav />
        < Search />
        < Friends />
        
      </div>
    )
  }

export default Sidebar;
