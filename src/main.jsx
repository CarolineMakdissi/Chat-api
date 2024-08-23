import { StrictMode } from "react"; // Importerar StrictMode från React. StrictMode hjälper till att hitta problem i appen under utveckling
import { createRoot } from "react-dom/client"; // Importerar createRoot från react-dom/client. createRoot används för att skapa en plats i DOM:en för React-applikationen
import App from "./App.jsx"; // Importerar huvudkomponenten App från en lokal fil. App är den komponent som kommer att visas på sidan

// Skapar en rot för React-applikationen och renderar innehållet där.
// createRoot används för att starta rendering i ett givet DOM-element, här är 'root'.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Renderar huvudkomponenten App inom StrictMode. StrictMode aktiverar extra kontroller och varningar för komponenter. */}
    <App />
  </StrictMode>
);
