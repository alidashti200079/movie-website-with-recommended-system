import { TableRow, TableCell, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { UpdateVotedContext } from './updateVotedContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VotesRow = ({ id, user_id, movie_id, user_rating, handleDelete, handleUpdate }) => {
  
  const [updateVoteInfo, setUpdateVoteInfo] = useContext(UpdateVotedContext)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateField = (e) => {
    setUpdateVoteInfo({...updateVoteInfo, [e.target.name]: e.target.value})
  }

  const postData = async (e) => {
    e.preventDefault()

    const url = "http://localhost:8000/voted/" + updateVoteInfo['id']

    const response = await fetch(url, {
      method: "PUT",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: updateVoteInfo['user_id'],
        movie_id: updateVoteInfo['movie_id'],
        user_rating: updateVoteInfo['user_rating']
      })
    })

    response.json().then(resp => {
      if (resp.status === 'ok' ) {
        toast.success("Vote updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Adjust the duration as needed
        });
      } else {
        alert("Failed to update Vote")
      }
    })

    setUpdateVoteInfo({
      user_id: "",
      movie_id:"",
      user_rating: "",
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
      <TableCell>{user_id}</TableCell>
      <TableCell>{movie_id}</TableCell>
      <TableCell>{user_rating}</TableCell>
      <TableCell>
        <Button variant="outlined" color="primary" onClick={() => handleUpdateAndOpenDialog(id)}>Update</Button>
        <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>Delete</Button>
      </TableCell>
    </TableRow>
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} aria-labelledby="form-dialog-title">
        <DialogTitle>Edit Vote</DialogTitle>
        <DialogContent>
          <>
            <TextField label="User_id" name="user_id" value={updateVoteInfo.user_id} onChange={updateField} fullWidth />
            <TextField label="Movie_id" name="movie_id" value={updateVoteInfo.movie_id} onChange={updateField} fullWidth />
            <TextField label="User_rating" name="user_rating" value={updateVoteInfo.user_rating} onChange={updateField} fullWidth />
          </>
        </DialogContent>
        <Button onClick={postData}>Edit</Button>
        </Dialog>
      </>
);
}

export default VotesRow;
