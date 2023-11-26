import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";
import "./CSS/Login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const login = () => {
    const data = { username: userName, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="loginContainer">
      <label>User Name: </label>
      <input
        type="text"
        placeholder="User name"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <label>Password: </label>
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>Login User</button>
    </div>
  );
}

export default Login;
