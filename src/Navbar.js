import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ brand }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">{brand}</span>
        </div>
    </nav>
  );
};

export default Navbar;
