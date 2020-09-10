import React from 'react';

import { Link } from "react-router-dom";

import styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerTab}>
      <Link to="/">
        <span>Main</span>
      </Link>
    </div>
    <div className={styles.footerTab}>
      <Link to="/events">
        <span>Tasks</span>
      </Link>
    </div>
    <div className={styles.footerTab}>
      <Link to="/profile">
        <span>Options</span>
      </Link>
    </div>
  </footer>
);

export default Footer;
