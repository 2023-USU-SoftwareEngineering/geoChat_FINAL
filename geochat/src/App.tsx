import { useContext, useState } from 'react'
import './index.css'
import Register from './pages/Register'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext';


function App() {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    < BrowserRouter >
      <Routes>
        <Route path='/'>
          <Route index element = { currentUser ? <Home/> : <Login/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
