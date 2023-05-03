import logo from '../assets/GeoChatLogo.png';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';
import "../index.css";

function Home() {  
    return (
      <div className='home'>
        <div className='container'>
            < Sidebar />
            < Chat />
        </div>
      </div>
    )
  }

export default Home;
