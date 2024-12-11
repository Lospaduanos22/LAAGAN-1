import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-text-white">LET'S PLAN YOUR</span>
          <br />
          <span className="hero-text-highlight">LAAG!</span>
        </h1>
        <Link to="/create-trip">
          <Button>Plan Trip Now</Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
