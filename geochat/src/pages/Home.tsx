import logo from '../assets/GeoChatLogo.png';
import Chat from '../components/chat';
import Sidebar from '../components/sidebar';
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
