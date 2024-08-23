import React, { useState } from "react"; // Importerar react och useState
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Importerar Browser som router , Routes, Route, imoprterar även navigate från react-router-dom
import Register from "./Pages/Register/Register"; // Importerar Register-komponenten från Pages
import Login from "./Pages/Login/Login"; // Importerar Login-komponenten från Pages
import Chat from "./Pages/Chat/Chat"; // Importerar Chat-komponenten från Pages
import SideNav from "./Components/SideNav/SideNav"; // Importerar SideNav-komponenten från Components
import Logout from "./Pages/Logout/Logout"; // Importerar Logout-komponenten från Pages
import { AuthContext } from "./Context/AuthContext"; // Importerar AuthContext från Context
import "./App.css"; // Importerar css fil 

function App() {
  // Hämtar sparad token från sessionStorage
  const savedToken = sessionStorage.getItem("token"); // Kontrollera om användaren är inloggad
  // Använder useState för att hantera token i komponentens tillstånd
  const [token, setToken] = useState(savedToken);
  console.log("app token", token);
  // Funktion för att uppdatera token och skriva ut det till konsolen
  const handleToken = (token) => {
    console.log("app setting token", token);
    setToken(token);
  };
  return (
    <AuthContext.Provider value={{ token, setToken: handleToken }}>
      <Router>
        <div className="app-container">
          {token && <SideNav />} {/* Visa SideNav om användaren är inloggad */}
          <div className="app-body">
            <Routes>
              {/* Om användaren är inloggad, gå till "/chat". Annars gå till "/login" */}
              <Route
                path="/"
                element={
                  token ? <Navigate to="/chat" /> : <Navigate to="/login" />
                }
              />
              {/* Om användaren är inloggad, gå till "/chat". Annars visa registreringssidan */}
              <Route
                path="/register"
                element={token ? <Navigate to="/chat" /> : <Register />}
              />
              {/* Om användaren är inloggad, gå till "/chat". Annars visa inloggningssidan */}
              <Route
                path="/login"
                element={token ? <Navigate to="/chat" /> : <Login />}
              />
              {/* Om användaren är inloggad, visa chatten. Annars gå till "/login" */}
              <Route
                path="/chat"
                element={token ? <Chat /> : <Navigate to="/login" />}
              />
              {/* Visa utloggningssidan */}
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
