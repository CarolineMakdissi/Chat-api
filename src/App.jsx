import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import Profile from "./Components/Profile/Profile";
import SideNav from "./Components/SideNav/SideNav";
import Footer from "./Components/Footer/Footer";

function App() {
  const token = localStorage.getItem("token"); // Kontrollera om användaren är inloggad

  return (
    <Router>
      <div className="app-container">
        {token && <SideNav />} {/* Visa SideNav om användaren är inloggad */}
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/chat" /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/chat" /> : <Register />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/chat" /> : <Login />}
          />
          <Route
            path="/chat"
            element={token ? <Chat /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes> 
        <Footer /> {/*Lägger footer utanför*/}
      </div>
    </Router>
  );
}

export default App;
