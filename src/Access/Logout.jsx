// Header.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const Logout = () => {
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login'; 
  };

  return (
    <div className="d-flex justify-content-around bg-light">
      {isAuthenticated && (
        <>
          <span className="text-dark">Hi, {username}!</span>
          <span className="text-dark ms-2">{currentTime}</span>
          <a className="text-decoration-none cursor" onClick={handleLogout}>
            Logout
          </a>
        </>
      )}
    </div>
  );
};

export default Logout;
