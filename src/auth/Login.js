// src/auth/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebaseConfig';
import './Login.css'; 
import LogoImage from '../assets/LogoAgenda.png'

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Erro ao fazer login: ', error);
    }
  };

  return (
    
    <div className="login-container">
    <div className="image-container">
        <img src={LogoImage} alt="Imagem de fundo" className="background-image" />
      </div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Entrar</button>
      </form>
      <p>
        Não possui uma conta? <Link to="/register">Registre-se</Link>
      </p>
      
    </div>
  );
};

export default Login;
