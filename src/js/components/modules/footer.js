import React from 'react';

import { Link } from 'react-router';

import './footer.scss';

const Footer = () => {
  return (
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
  )
};

export default Footer;
