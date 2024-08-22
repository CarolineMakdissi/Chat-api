import React, { useState, useContext } from "react";//Importera useState
import axios from "axios";//Importera axios 
import "./login.css";//Importera css filen 
import { useNavigate } from "react-router-dom";//Importera useNavigate
import { AuthContext } from '../../Context/AuthContext'
const csrfUrl = "https://chatify-api.up.railway.app/csrf";
const loginUrl = "https://chatify-api.up.railway.app/auth/token";

function Login() {
  const {  setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleToken = async (e) => {
    e.preventDefault();
    try {
      // fetch csrf token
      const csrfResponse = await axios.patch(csrfUrl);
      const csrfToken = csrfResponse.data.csrfToken;
      console.log("fetched csrf token", csrfToken);

      // Get token by sending username, password and csrf token
      const handleLogin = await axios.post(loginUrl, {
        username: username,
        password: password,
        csrfToken: csrfToken,
      });

      const auth = handleLogin.data.token;
      console.log("fetched token", auth);
      sessionStorage.setItem("token", auth);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("avatar", "https://i.pravatar.cc/200");
      setToken(auth)
      navigate("/chat");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleToken}>
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
