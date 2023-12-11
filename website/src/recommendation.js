import './navbar.css';
import './footer.css';
import Navbar from './navbar.js';
import Footer from './footer';
import midImage from "./pics/05.jpeg";
import React, { useState } from 'react';

const Recommendation = () => {

    const midStyle = {
        backgroundImage: `url(${midImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '900px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
    };
    const div2 = {
        background: 'rgba(245, 243, 237, 0.9)',
        padding: '40px',
        borderRadius: '8px',
        width: '80%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'opacity 0.5s', 
        width: '25%',
        margin: '0 0 0 36%'
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        alignItems: 'center',
        width: '100%',
    };

    const buttonStyle = {
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
    };

    const movieCardStyle = {
        flex: '1',
        backgroundColor: '#f2f2f2',
        borderRadius: '10px',
        padding: '7px',
        margin: '10px 20px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        maxWidth: '250px',
    };

    const movieImageStyle = {
        width: '100%', // Adjusted width for better responsiveness
        borderRadius: '8px',
        marginBottom: '5px',
    };

    const movieDescriptionStyle = {
        marginBottom: '5px',
        color: '#2b9395',
        fontSize: '15px',
    };

    const movieRatingStyle = {
        fontWeight: 'bold',
        color: '#007BFF',
        fontSize: '15px',
    };

    const [showForm, setShowForm] = useState(true);
    const [movies, setMovies] = useState([]);
    const [email, setEmail] = useState('');
    const [noResult, setNoResult] = useState();

    const handleFindClick = async () => {

        setShowForm(false);

        const userEmail = email.trim();
        console.log(userEmail);
        
        try {
            const response = await fetch('/api/recom', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log(result);
            setMovies(result);
            if (result.length !== 0){setNoResult(1)}
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
        
    } 

    return (
    <> 
    <Navbar />
      <div style={midStyle}>
        
        <div style={div2}>
            {showForm ? (
            <form style={formStyle} className="signup-form">
                <h2 style={{ color: '#FF5733' }}>Enter your email</h2>
                <input
                    style={inputStyle}
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                style={buttonStyle}
                type="button"
                onClick={handleFindClick}
                >
                Find
                </button>
            </form>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {noResult ? (
    
                        movies.map((movie) => (
                            <div  key={movie.id} style={movieCardStyle} >
                                <img src={movie.image} alt={movie.name} style={movieImageStyle} />
                                <h3 style={{color: '#333', fontSize: '16px'}}>{movie.name}</h3>
                                {<p style={movieDescriptionStyle}> {movie.description}</p>}
                                <p style={movieRatingStyle}>Rating: {movie.rating}</p>
                                <button>Watch Now</button>
                            </div>
                        ))
                    ) : (
                        // Render a message or another component
                        <div style={{color:'#FF5733', fontSize:30, marginLeft:'27%'}}>
                            Unfortunately, your email was not found among users.
                        </div>
                    )}
                </div>
            )}
        </div>

      </div>
    <Footer />
    </>
    );
};

export default Recommendation;