import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; 

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      console.log('Logged in successfully:', response.data);
      // Update authentication status
      setIsAuthenticated(true);
      // Redirect to homepage
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default LoginForm;
