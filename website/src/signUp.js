import React, { useState } from 'react';
import './signUp.css';
import moviesImage from "./pics/001.jpg";
import api from './api/api';

const SignUp = () => {

  const [usersFormData, setUsersFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if (event.target.name.trim() !== '') { // Check if the name is not an empty string
        setUsersFormData({
          ...usersFormData,
          [event.target.name]: value,
      });
    }
  };
  
  async function handleFormSubmit(event) {
    event.preventDefault();
    console.log('Form Submit:', usersFormData);
  
    try {
      // Make the API request with the current form data
      await api.post('/user', usersFormData);
  
      // Reset the form after successful API request
      setUsersFormData({
        username: '',
        email: '',
        password: ''
      });
      window.location.href = '/';
    } catch (error) {
      // Handle error if necessary
      console.error('Error submitting form:', error);
    }


  }

  return (
   
    
        <div className="signup-container">
          <div className="movie-image">
            <img src={moviesImage} alt="Movies" />
          </div>
          <form className="signup-form">
            <h2>Sign Up</h2>
            <input name="username" placeholder="Name" onChange={handleInputChange} />
            <input name="email" placeholder="Email" onChange={handleInputChange} />
            <input name="password" placeholder="Password" onChange={handleInputChange} />
            <button type="submit" onClick={handleFormSubmit} >Sign Up</button>
          </form>
        </div>
  

  );
};

export default SignUp;
