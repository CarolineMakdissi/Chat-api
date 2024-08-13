import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Chat from './Components/Chat/Chat';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import SideNav from './Components/SideNav/SideNav';
import Footer from './Components/Footer/Footer';
import './App.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <> <BrowserRouter>
      <div className='App'>
       <SideNav/>
      <Routes>
      <Route path="/auth/token" element={<Login/>}/>
      <Route path="auth/register" element={<Register/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/messages/messages/messages/msgId" element={<Chat/>}/>
      </Routes>  
      <Footer/>
      </div>  
      </BrowserRouter>
    </>
  )
}

export default App;
