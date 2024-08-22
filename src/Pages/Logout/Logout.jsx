import React, { useEffect, useContext } from "react"; //Importera useState
import { useNavigate } from "react-router-dom"; //Importera useNavigate
import { AuthContext } from '../../Context/AuthContext'

function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("avatar");
    setToken('')
    navigate("/login");
  }, [navigate]);

  return null;
}

export default Login;
