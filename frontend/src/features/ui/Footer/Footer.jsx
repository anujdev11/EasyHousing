// Author: Pankti Vyas (B00886309)

import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p className="footer__company-name">EasyHousing Inc.© 2022</p>

      <div className="footer__links">
        <a href="/" className="footer__link">About Us</a>
        <a href="/" className="footer__link">Privacy</a>
        <a href="/" className="footer__link">Contact Us</a>
      </div>
    </footer>
  )
};

export default Footer;