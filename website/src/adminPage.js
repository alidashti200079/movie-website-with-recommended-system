import React, { useState } from 'react';
import { Tabs, Tab, Dialog, DialogTitle, DialogContent, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState('Movies');
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [items, setItems] = useState({
    Movies: [
      { id: 1, name: 'Movie 1', image: 'image_url_1', description: 'Description 1', rating: 4.5 },
      { id: 2, name: 'Movie 2', image: 'image_url_2', description: 'Description 2', rating: 6 },
      { id: 3, name: 'Movie 3', image: 'image_url_3', description: 'Description 3', rating: 7.1 },
      { id: 4, name: 'Movie 4', image: 'image_url_4', description: 'Description 4', rating: 8 },
      { id: 5, name: 'Movie 5', image: 'image_url_5', description: 'Description 5', rating: 3.8 },
      { id: 6, name: 'Movie 6', image: 'image_url_6', description: 'Description 6', rating: 5.8 },
      // ... other movie items
    ],
    Series: [
      { id: 1, name: 'Series 1', image: 'image_url_1', description: 'Description 1', rating: 4.2 },
      // ... other series items
    ],
    Actors: [
      { id: 1, name: 'Actor 1', image: 'image_url_1', description: 'Description 1', rating: 4.7 },
      { id: 2, name: 'Actor 2', image: 'image_url_2', description: 'Description 2', rating: 6.3 },
      { id: 3, name: 'Actor 3', image: 'image_url_3', description: 'Description 3', rating: 2.9 },
      // ... other actor items
    ],
    Users: [
      { id: 1, username: 'user1', password: 'pass1', email: 'user1@example.com' },
      // ... other user items
    ],
    Admins: [
      { id: 1, username: 'admin1', password: 'adminpass1', email: 'admin@example.com' },
      // ... other admin items
    ],
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
  };

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    setItems((prevItems) => ({
      ...prevItems,
      [selectedTab]: [...prevItems[selectedTab], formData],
    }));
    handleCloseDialog();
  };

  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => ({
      ...prevItems,
      [selectedTab]: prevItems[selectedTab].filter((item) => item.id !== itemId),
    }));
  };

  const renderListView = () => {
    const tabItems = items[selectedTab];

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              {selectedTab !== 'Users' && selectedTab !== 'Admins' && (
                <>
                  <TableCell>Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Rating</TableCell>
                </>
              )}
              {(selectedTab === 'Users' || selectedTab === 'Admins') && (
                <>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Password</TableCell>
                </>
              )}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                {selectedTab !== 'Users' && selectedTab !== 'Admins' && (
                  <>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.image}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.rating}</TableCell>
                  </>
                )}
                {(selectedTab === 'Users' || selectedTab === 'Admins') && (
                  <>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.password}</TableCell>
                  </>
                )}
                <TableCell>
                  <Button onClick={() => handleDeleteItem(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderDialog = () => (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add New {selectedTab.slice(0, -1)}</DialogTitle>
      <DialogContent>
        {selectedTab !== 'Users' && selectedTab !== 'Admins' && (
          <>
            <TextField label="ID" name="id" onChange={handleFormDataChange} fullWidth />
            <TextField label="Name" name="name" onChange={handleFormDataChange} fullWidth />
            <TextField label="Image" name="image" onChange={handleFormDataChange} fullWidth />
            <TextField label="Description" name="description" onChange={handleFormDataChange} fullWidth />
            <TextField label="Rating" name="rating" onChange={handleFormDataChange} fullWidth />
          </>
        )}
        {(selectedTab === 'Users' || selectedTab === 'Admins') && (
          <>
            <TextField label="ID" name="id" onChange={handleFormDataChange} fullWidth />
            <TextField label="Username" name="username" onChange={handleFormDataChange} fullWidth />
            <TextField label="Email" name="email" onChange={handleFormDataChange} fullWidth />
            {(selectedTab === 'Users' || (selectedTab === 'Admins' && !formData.password)) && (
              <TextField label="Password" name="password" type="password" onChange={handleFormDataChange} fullWidth />
            )}
          </>
        )}
      </DialogContent>
      <Button onClick={handleAddItem}>Add</Button>
    </Dialog>
  );

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Movies" value="Movies" />
        <Tab label="Series" value="Series" />
        <Tab label="Actors" value="Actors" />
        <Tab label="Users" value="Users" />
        <Tab label="Admins" value="Admins" />
      </Tabs>
      <div>
        {renderListView()}
        <Button onClick={handleOpenDialog}>Add</Button>
        <Link to={"/"}>
            <Button>back</Button>
        </Link>
      </div>
      {renderDialog()}
    </div>
  );
};

export default AdminPage;


