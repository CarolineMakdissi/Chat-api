import React, { useState } from "react"; //Importerar useState 
import { useNavigate } from "react-router-dom"; //Importerar useNavigate hook
import axios from "axios";//Importerar axios
import "./Register.css";//Importerar css filen
 
const url = "https://chatify-api.up.railway.app/auth/register";
const csrfUrl = "https://chatify-api.up.railway.app/csrf";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // fetch csrf token
      const csrfResponse = await axios.patch(csrfUrl);
      const csrfToken = csrfResponse.data.csrfToken;

      const resp = await axios.post(url, {
        username: username,
        email: email,
        password: password,
        csrfToken: csrfToken
      });
      setSuccess(resp.data.message);
      console.log(resp.data.message);

      navigate('/login');
    } catch (error) { 
      console.log(error.response);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Register;
