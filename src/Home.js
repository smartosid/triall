import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
//import logo from './assets/drdologo.png'; // Adjust the path if necessary

const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
         DRDO
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </nav>
      <div className="home-container">
        <h1 className="home-title">Welcome to DRDO Aircraft log in Database</h1>
        <div className="button-container">
          <Link to="/page1">
            <button className="home-button">Upload</button>
          </Link>
          <Link to="/page2">
            <button className="home-button">Download/View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
