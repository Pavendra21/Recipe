import React from 'react';
import '../App.css'; // Ensure to import the CSS
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent Link position-absolute top-0 start-50 translate-middle-x">
      <div className="container-fluid">

        <Link className="navbar-brand position-relative top-0 start-0" to="/"><strong>Cook-Easy</strong></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse position-relative top-0 start-50 translate-middle-x" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active  p-4 hover" aria-current="page" to="/">Home</Link>
            <ScrollLink className="nav-link active p-4" to="categories" smooth={true} duration={500}>Categories</ScrollLink>
            <Link className="nav-link active  p-4" to="Contact">Contact Us</Link>
            <Link className="nav-link active  p-4" to="About">About Us</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;