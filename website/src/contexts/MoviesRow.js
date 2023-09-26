import { TableRow, TableCell, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { UpdateMovieContext } from './updateMovieContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MoviesRow = ({ id, name, image, description, genre, rating, handleDelete, handleUpdate }) => {
  
  const [updateMovieInfo, setUpdateMovieInfo] = useContext(UpdateMovieContext)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateField = (e) => {
    setUpdateMovieInfo({...updateMovieInfo, [e.target.name]: e.target.value})
  }

  const postData = async (e) => {
    e.preventDefault()

    const url = "http://localhost:8000/movie/" + updateMovieInfo['id']

    const response = await fetch(url, {
      method: "PUT",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: updateMovieInfo['name'],
        image: updateMovieInfo['image'],
        description: updateMovieInfo['description'],
        genre: updateMovieInfo['genre'],
        rating: updateMovieInfo['rating']
      })
    })

    response.json().then(resp => {
      if (resp.status === 'ok' ) {
        toast.success("Moie updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Adjust the duration as needed
        });
      } else {
        alert("Failed to update Movie")
      }
    })

    setUpdateMovieInfo({
      name: "",
      image:"",
      description: "",
      genre: "",
      rating: "",
      id: ""
    })

    handleCloseEditDialog();
  }

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleUpdateAndOpenDialog = (id) => { 
    handleUpdate(id);
    setIsEditDialogOpen(true);  
  }

  return (
    <>
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{image}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{genre}</TableCell>
      <TableCell>{rating}</TableCell>
      <TableCell>
        <Button variant="outlined" color="primary" onClick={() => handleUpdateAndOpenDialog(id)}>Update</Button>
        <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>Delete</Button>
      </TableCell>
    </TableRow>
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} aria-labelledby="form-dialog-title">
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          <>
            <TextField label="Name" name="name" value={updateMovieInfo.name} onChange={updateField} fullWidth />
            <TextField label="Image" name="image" value={updateMovieInfo.image} onChange={updateField} fullWidth />
            <TextField label="Description" name="description" value={updateMovieInfo.description} onChange={updateField} fullWidth />
            <TextField label="genre" name="genre" value={updateMovieInfo.genre} onChange={updateField} fullWidth />
            <TextField label="Rating" name="rating" value={updateMovieInfo.rating} onChange={updateField} fullWidth />
          </>
        </DialogContent>
        <Button onClick={postData}>Edit</Button>
        </Dialog>
      </>
);
}

export default MoviesRow;
