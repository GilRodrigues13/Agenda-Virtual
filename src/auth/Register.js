import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebaseConfig';
import './Register.css';
import LogoImage from '../assets/LogoAgenda.png'

const Register = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Erro ao fazer registro: ', error);
    }
  };

  return (
    <div className="register-container">
    <div className="image-container">
        <img src={LogoImage} alt="Imagem de fundo" className="background-image" />
      </div>
      <h2>Registrar</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
      <p>
        Já possui uma conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
};

export default Register;
