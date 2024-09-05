import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-center">
        <Link to="/" className={`navbar-brand ${location.pathname === '/' ? 'active' : ''}`}>
          Поиск
        </Link>
        <Link to="/favorites" className={`navbar-brand ${location.pathname === '/favorites' ? 'active' : ''}`}>
          Избранное
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
