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
          const response = await axios.post('http://localhost:3001/auth/register', { username, email, password });
          console.log('Registered successfully:', response.data);
          alert('User registered successfully');
          handleToggle();

        } catch (error) {
          error.response.data.error;
        }
      } else {
        const response = await axios.post('http://localhost:3001/auth/login', { email, password });
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
    <div className="main-body">
      <div className={`login-container ${isSignup ? 'right-panel-active' : ''}`}>
        <div className="login-form-container sign-in-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-h1"> Sign In</h1>
            <input className="login-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <a className="login-a" href="#">Forgot your password?</a>
            <button className="login-button" type="submit">Sign In</button>
          </form>
        </div>
        <div className="login-form-container sign-up-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-h1">Sign Up</h1>
            <input className="login-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input className="login-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" onClick={() => setIsSignup(isSignup)} className="login-button signup-button">Sign Up</button>
          </form>
        </div>
        <div className="login-overlay-container">
          <div className="login-overlay">
            <div className="login-overlay-panel login-overlay-left">
              <h1 className="login-h1">Welcome Back!</h1>
              <p className="login-p">Please login with your personal info</p>
              <button className="ghost login-button" onClick={handleToggle} id="signIn">Sign In</button>
            </div>
            <div className="login-overlay-panel login-overlay-right">
              <h1 className="login-h1">Hello, Friend!</h1>
              <p className="login-p">Enter your personal details and start your journey with us</p>
              <button className="ghost login-button" onClick={handleToggle} id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
        {error && <p className="error-message login-p">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
