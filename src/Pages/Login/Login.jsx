import React, { useState, useContext } from "react"; //Importera useState och useContext
import axios from "axios"; //Importera axios för att göra http förfrågningar
import "./Login.css"; //Importera css filen
import { useNavigate } from "react-router-dom"; //Importera useNavigate
import { AuthContext } from "../../Context/AuthContext"; // Importerar authContext
import { Link } from "react-router-dom";
const csrfUrl = "https://chatify-api.up.railway.app/csrf"; // URL för att hämta CSRF-token
const loginUrl = "https://chatify-api.up.railway.app/auth/token"; // URL för att logga in

function Login() {
  const { setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleToken = async (e) => {
    e.preventDefault();
    try {
      // fetch csrf token
      const csrfResponse = await axios.patch(csrfUrl);
      const csrfToken = csrfResponse.data.csrfToken; // Spara CSRF-token
      console.log("fetched csrf token", csrfToken);

      // Get token genom att skicka användarnamn, lösenord och csrf-token
      const handleLogin = await axios.post(loginUrl, {
        username: username,
        password: password,
        csrfToken: csrfToken,
      });

      const auth = handleLogin.data.token; // Spara autentiseringstoken
      console.log("fetched token", auth);
      sessionStorage.setItem("token", auth); // Spara token i sessionStorage
      sessionStorage.setItem("username", username); // Spara användarnamn i sessionStorage
      sessionStorage.setItem("avatar", "https://i.pravatar.cc/100?img=5");
      setToken(auth); // Uppdatera token i AuthContext
      navigate("/chat"); // Navigera till chat-sidan
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleToken}>
        {" "}
        {/* Formulär som hanterar inloggning, kör handleToken när det skickas */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Uppdatera lösenord
          />
        </div>
        <Link to="/register">dont have an account? register on here</Link>
        <br /><br />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
