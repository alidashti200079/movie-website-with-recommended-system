import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { MovieProvider } from './contexts/movieContext';
import MoviesTable from './contexts/movieTable'
import SeriesTable from './contexts/serieTable';
import { SerieProvider } from './contexts/serieContext'
import { ActorProvider } from './contexts/actorContext';
import ActorsTable from './contexts/actorTable'
import { UserProvider } from './contexts/userContext';
import UsersTable from './contexts/userTable';
import { AdminProvider } from './contexts/adminContext';
import AdminsTable from './contexts/adminTable';
import api from './api/api';
import { UpdateMovieContextProvider } from './contexts/updateMovieContext';
import { UpdateAdminContextProvider } from './contexts/updateAdminContext';
import { UpdateActorContextProvider } from './contexts/updateActorContext';
import { UpdateSerieContextProvider } from './contexts/updateSerieContext';
import { UpdateUserContextProvider } from './contexts/updateUserContext';

const AdminPage = () => {

  const [selectedTab, setSelectedTab] = useState('Movies');
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({}); 
  const [formMovie, setFormMovie] = useState({
    name: '',
    image: '',
    description: '', 
    genre: '',
    rating: ''
  });
  const [seriesFormData, setSeriesFormData] = useState({
    name: '',
    image: '',
    description: '', 
    genre: '',
    rating: ''
  });
  const [actorsFormData, setActorsFormData] = useState({
    name: '',
    image: '',
    description: '', 
  });
  const [usersFormData, setUsersFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [adminsFormData, setAdminsFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if (selectedTab === 'Movies') {
      setFormMovie({
        ...formMovie,
        [event.target.name]: value,
      });
    } else if (selectedTab === 'Series') {
      setSeriesFormData({
        ...seriesFormData,
        [event.target.name]: value,
      });
    } else if (selectedTab === 'Actors') {
      setActorsFormData({
        ...actorsFormData,
        [event.target.name]: value,
      });
    } else if (selectedTab === 'Users') {
      setUsersFormData({
        ...usersFormData,
        [event.target.name]: value,
      });
    } else if (selectedTab === 'Admins') {
      setAdminsFormData({
        ...adminsFormData,
        [event.target.name]: value,
      });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (selectedTab === 'Movies') {
      await api.post('/movie', formMovie);
      setFormMovie({
        name: '',
        image: '',
        description: '', 
        genre: '',
        rating: ''
      })
    } else if (selectedTab === 'Series') {
      await api.post('/series', seriesFormData);
      setSeriesFormData({
        name: '',
        image: '',
        description: '', 
        genre: '',
        rating: ''
      })
    } else if (selectedTab === 'Actors') {
      await api.post('/actor', actorsFormData);
      setActorsFormData({
        name: '',
        image: '',
        description: ''
      })
    } else if (selectedTab === 'Users') {
      await api.post('/user', usersFormData);
      setUsersFormData({
        username: '',
        email: '',
        password: ''
      })
    } else if (selectedTab === 'Admins') {
      await api.post('/admin', adminsFormData);
      setAdminsFormData({
        username: '',
        email: '',
        password: ''
      })
    }
    handleCloseDialog();
  } 

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
  };

  const renderDialog = () => (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add New {typeof selectedTab === 'string' ? selectedTab.slice(0, -1) : ''}</DialogTitle>
      <DialogContent>
        {selectedTab !== 'Users' && selectedTab !== 'Admins' && selectedTab !== 'Actors' && (
          <>
            <TextField label="Name" name="name" onChange={handleInputChange} fullWidth />
            <TextField label="Image" name="image" onChange={handleInputChange} fullWidth />
            <TextField label="Description" name="description" onChange={handleInputChange} fullWidth />
            <TextField label="genre" name="genre" onChange={handleInputChange} fullWidth />       
            <TextField label="Rating" name="rating" onChange={handleInputChange} fullWidth />
          </>
        )}
        {selectedTab === 'Actors' && (
          <>
            <TextField label="Name" name="name" onChange={handleInputChange} fullWidth />
            <TextField label="Image" name="image" onChange={handleInputChange} fullWidth />
            <TextField label="Description" name="description" onChange={handleInputChange} fullWidth />
          </>
        )}
        {(selectedTab === 'Users' || selectedTab === 'Admins') && (
          <>
            <TextField label="Username" name="username" onChange={handleInputChange} fullWidth />
            <TextField label="Email" name="email" onChange={handleInputChange} fullWidth />
            {(selectedTab === 'Users' || (selectedTab === 'Admins' && !formData.password)) && (
              <TextField label="Password" name="password" type="password" onChange={handleInputChange} fullWidth />
            )}
          </>
        )}
      </DialogContent>
      <Button onClick={handleFormSubmit}>Add</Button>
    </Dialog>
  );

  return (
    <div>
      <div>
        <Button onClick={() => handleTabChange('Movies')}>Movies</Button>
        <Button onClick={() => handleTabChange('Series')}>Series</Button>
        <Button onClick={() => handleTabChange('Actors')}>Actors</Button>
        <Button onClick={() => handleTabChange('Users')}>Users</Button>
        <Button onClick={() => handleTabChange('Admins')}>Admins</Button>
      </div>
      {renderDialog()}

      {selectedTab === 'Movies' && (
      <MovieProvider>
        <UpdateMovieContextProvider>
          <MoviesTable />
        </UpdateMovieContextProvider>
      </MovieProvider>
      )}

      {selectedTab === 'Series' && (
        <SerieProvider>
          <UpdateSerieContextProvider>
            <SeriesTable />
          </UpdateSerieContextProvider>
        </SerieProvider>
      )}

      {selectedTab === 'Actors' && (
        <ActorProvider>
          <UpdateActorContextProvider>
            <ActorsTable />
          </UpdateActorContextProvider>
        </ActorProvider>
      )}

      {selectedTab === 'Users' && (
        <UserProvider>
          <UpdateUserContextProvider>
            <UsersTable />
          </UpdateUserContextProvider>
        </UserProvider>
      )}

      {selectedTab === 'Admins' && (
        <AdminProvider>
          <UpdateAdminContextProvider>
            <AdminsTable />
          </UpdateAdminContextProvider>
        </AdminProvider>
      )}

      <div style={{ margin:'-32px 0 0 0'}}>
        <Button onClick={handleOpenDialog}>Add</Button>
        <Link to={"/"}>
            <Button>back</Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;