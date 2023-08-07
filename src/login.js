import React, { useState , useEffect } from 'react';
import './login.css';
import moviesImage from "./pics/001.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    if (openDialog) {
      const timer = setTimeout(() => {
        setOpenDialog(false);
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [openDialog]);

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission

    if (username === 'admin' && password === 'admin') {
      navigate('/login/admin');
    } else if (username === '1' && password === '1') {
      navigate('/login/user');
    } else {
      // Show the incorrect login dialog
      setOpenDialog(true);
      setDialogMessage('Incorrect username or password');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="signup-container">
      <div className="movie-image">
        <img src={moviesImage} alt="Movies" />
      </div>
      <form className="signup-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="remember-me">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      {/* Incorrect Login Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Incorrect Login</DialogTitle>
        <DialogContent>
          <p>{dialogMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;





