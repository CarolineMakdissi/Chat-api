import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importera CSS-filen

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://chatify-api.up.railway.app/auth/token', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/chat');
    } catch (err) {
      setError('Felaktiga inloggningsuppgifter.Försök igen!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Välkommen!</p>
      <h2>Logga in</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-post"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Lösenord"
        required
      />
      <button type="submit">Logga in</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;