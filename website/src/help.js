import React from 'react';
import './help.css';
import Navbar from './navbar';
import Footer from './footer';

const Help = () => {
  return (
    <>
    <Navbar/>
    <div className="help-page">
      <h2>About Our Website</h2>
      <p>
        Welcome to our Movie Website! We provide a comprehensive collection of movies, TV shows, and actors for your entertainment. Whether you're looking for new releases, classic films, or information about your favorite actors, we've got you covered.
      </p>
      <p>
        Our website offers a user-friendly interface that allows you to browse through our extensive database. You can search for specific movies or TV shows, explore different genres, and discover top-rated content. We strive to provide an enjoyable and immersive experience for all movie enthusiasts.
      </p>
      <h2>How Can We Help You?</h2>
      <p>
        We are here to assist you with any questions or issues you may encounter while using our website. Our dedicated support team is available to provide guidance and ensure you have the best possible experience.
      </p>
      <p>
        If you need assistance, have suggestions for improvement, or would like to report any problems, please reach out to our support team via the contact information below. We value your feedback and are committed to continually enhancing our website to meet your needs.
      </p>
      <div className="contact-info">
        <h3>Contact Information</h3>
        <ul>
          <li>Email: support@example.com</li>
          <li>Phone: 123-456-7890</li>
          <li>Address: 123 Street, City, Country</li>
        </ul>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Help;
