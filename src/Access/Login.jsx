import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import config from './config';
import logo from "./Assets/logo-2.jpeg"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Admin_access/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        login(username);
        navigate('/homepage');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-lg p-3 bg-white rounded" style={{ width: '500px' }}>
        <div className="card-body">
          
          <h2 className="card-title text-center"><img style={{ width: "120px", borderRadius: "5px"}} src={logo} alt="Logo" /></h2>
          <hr></hr>
          <form onSubmit={handleLogin} className= 'mt-3'>
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="mb-3 mt-2">
              <label htmlFor="username" className="fw-bold form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="fw-bold form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className=" mt-4 btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
