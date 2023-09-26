import { TableRow, TableCell, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { UpdateActorContext } from './updateActorContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActorsRow = ({ id, name, image, description, handleDelete, handleUpdate }) => {

  const [updateActorInfo, setUpdateActorInfo] = useContext(UpdateActorContext)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateField = (e) => {
    setUpdateActorInfo({...updateActorInfo, [e.target.name]: e.target.value})
  }

  const postData = async (e) => {
    e.preventDefault()

    const url = "http://localhost:8000/actor/" + updateActorInfo['id']

    const response = await fetch(url, {
      method: "PUT",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: updateActorInfo['name'],
        image: updateActorInfo['image'],
        description: updateActorInfo['description']
      })
    })

    response.json().then(resp => {
      if (resp.status === 'ok' ) {
        toast.success("Actor updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Adjust the duration as needed
        });
      } else {
        alert("Failed to update Actor")
      }
    })

    setUpdateActorInfo({
      name: "",
      image:"",
      description: "",
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
      <TableCell>
        <Button variant="outlined" color="primary" onClick={() => handleUpdateAndOpenDialog(id)}>Update</Button>
        <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>Delete</Button>
      </TableCell>
    </TableRow>
    <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} aria-labelledby="form-dialog-title">
    <DialogTitle>Edit Actor</DialogTitle>
    <DialogContent>
      <>
        <TextField label="Name" name="name" value={updateActorInfo.name} onChange={updateField} fullWidth />
        <TextField label="Image" name="image" value={updateActorInfo.image} onChange={updateField} fullWidth />
        <TextField label="Description" name="description" value={updateActorInfo.description} onChange={updateField} fullWidth />
      </>
    </DialogContent>
    <Button onClick={postData}>Edit</Button>
    </Dialog>
    </>
  );
}

export default ActorsRow;
