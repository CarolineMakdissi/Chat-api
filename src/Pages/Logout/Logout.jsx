import React, { useEffect, useContext } from "react"; //Importera , react , useState och useContext
import { useNavigate } from "react-router-dom"; //Importera useNavigate för att kunna navigera mellan sidor
import { AuthContext } from "../../Context/AuthContext"; // Importera authContext

function Login() {
  const navigate = useNavigate(); // Skapa en funktion för att byta sida
  const { setToken } = useContext(AuthContext); // Hämta funktionen för att ändra token i AuthContext

  useEffect(() => {
    // Ta bort token och användardata från sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("avatar");
    setToken(""); // Sätt token till en tom sträng
    navigate("/login"); // navigerar till inloggningssidan
  }, [navigate]); // Kör detta när komponenten laddas

  return null; // Returnera inget eftersom det inte behövs något innehåll
}

export default Login;
