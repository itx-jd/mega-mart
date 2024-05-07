/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const LoginForm = ({setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const handleToggle = () => {
    setIsSignup(!isSignup);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        try {
          console.log('Registering user:', { username, email, password });
          const response = await axios.post('http://localhost:5000/auth/register', { username, email, password });
          console.log('Registered successfully:', response.data);
          alert('User registered successfully');
          handleToggle();

        } catch (error) {
          error.response.data.error;
        }
      } else {
        const response = await axios.post('http://localhost:5000/auth/login', { email, password });
        console.log('Logged in successfully:', response.data);
        setIsAuthenticated(true);
      
      navigate('/');
      }
      // Reset form fields
      setEmail('');
      setPassword('');
      setUsername('');
      setError('');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className={`container ${isSignup ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" onClick={() => setIsSignup(isSignup)} className="signup-button">Sign Up</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Please login with your personal info</p>
            <button className="ghost" onClick={handleToggle} id="signIn">Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={handleToggle} id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginForm;
