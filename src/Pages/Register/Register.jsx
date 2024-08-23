import React, { useState } from "react"; //Importerar useState
import { useNavigate } from "react-router-dom"; //Importerar useNavigate hook
import axios from "axios"; //Importerar axios
import { Link } from "react-router-dom";


const url = "https://chatify-api.up.railway.app/auth/register"; // URL för registrerings-API
const csrfUrl = "https://chatify-api.up.railway.app/csrf"; // URL för att hämta CSRF-token

function Register() {
  const [username, setUsername] = useState(""); // State för användarnamn
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // State för felmeddelande
  const [message, setSuccess] = useState(""); // State för framgångsmeddelande
  const [error, setError] = useState(""); // Hook för att navigera mellan sidor

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // fetch csrf token
      const csrfResponse = await axios.patch(csrfUrl);
      const csrfToken = csrfResponse.data.csrfToken; // Hämta CSRF-token från svaret
      // Skicka registreringsdata till servern
      const resp = await axios.post(url, {
        username: username,
        email: email,
        password: password,
        csrfToken: csrfToken,
      });
      setSuccess(resp.data.message); // Sätt framgångsmeddelande
      console.log(resp.data.message); // Logga meddelandet i konsolen

      navigate("/login"); // Navigera till inloggningssidan
    } catch (error) {
      console.log(error.response); // Logga felet i konsolen
      setError(error.response.data.error); // Sätt felmeddelande
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        {" "}
        {/* Formulär för registrering */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Uppdatera användarnamnet
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Uppdatera e-posten
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Uppdatera lösenordet
          />
        </div>
        <Link to="/login">already have an account? log in here</Link>
        <br /><br />
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}{" "}
        {/* Visa framgångsmeddelande om det finns */}
        {error && <p className="error">{error}</p>}{" "}
        {/* Visa felmeddelande om det finns */}
      </form>
    </div>
  );
}

export default Register;
