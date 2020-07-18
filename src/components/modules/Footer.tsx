import React from 'react';

import { Link } from "react-router-dom";

import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer-tab">
      <Link to="/">
        <span>Main</span>
      </Link>
    </div>
    <div className="footer-tab">
      <Link to="/events">
        <span>Tasks</span>
      </Link>
    </div>
    <div className="footer-tab">
      <Link to="/profile">
        <span>Options</span>
      </Link>
    </div>
  </footer>
);

export default Footer;
