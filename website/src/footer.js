import React from 'react';
import { FaTelegram, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://telegram.com/your_account" target="_blank" rel="noopener noreferrer" className="a">
            <FaTelegram className="icon" />
          </a>
          <a href="https://instagram.com/your_account" target="_blank" rel="noopener noreferrer" className="a">
            <FaInstagram className="icon" />
          </a>
          <a href="https://twitter.com/your_account" target="_blank" rel="noopener noreferrer" className="a">
            <FaTwitter className="icon" />
          </a>
          <a href="https://youtube.com/your_account" target="_blank" rel="noopener noreferrer" className="a">
            <FaYoutube className="icon" />
          </a>
        </div>
        <div className="footer-info">
          <p>Exploring the world of movies and more!</p>
          <p>Contact us at example@example.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Movie Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
