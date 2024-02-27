import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', { // Updated URL
        username,
        password,
        email,
      });
      if (response.status === 200 && response.data.success) {
        const accessToken = response.data.data.accessToken;
        Cookies.set('accessToken', accessToken, { expires: 7, sameSite: 'none', secure: true });

        setSuccess(true);
        setError(null);
        setRedirect(true);
      } else {
        setError('Login failed. Please try again!');
      }
    } catch (error) {
      console.log('login failed:', error);
      setError('Login failed. Please try again!');
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate('/home', { state: { id: username, email: email } });
    }
  }, [redirect, navigate, username, email]);
  

  return (
    <div className="mt-4">
      <h1 className="text-center font-bold text-4xl uppercase">Login</h1>
      <form onSubmit={handleLogin} action="submit" className="flex flex-col max-w-md mx-auto">
        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="your@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">Login successful</div>}
        <button className="primary">Login</button>

        <div className="mt-2 text-center">
          Don't have an account? <Link to="/register" className="text-blue-800 underline">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
