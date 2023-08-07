import React from 'react';
import './signUp.css';
import moviesImage from "./pics/001.jpg";

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="movie-image">
        <img src={moviesImage} alt="Movies" />
      </div>
      <form className="signup-form">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
