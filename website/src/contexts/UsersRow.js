import { TableRow, TableCell, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { UpdateUserContext } from './updateUserContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersRow = ({ id, username, email, password, handleDelete, handleUpdate }) => {

  const [updateUserInfo, setUpdateUserInfo] = useContext(UpdateUserContext)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateField = (e) => {
    setUpdateUserInfo({...updateUserInfo, [e.target.name]: e.target.value})
  }

  const postData = async (e) => {
    e.preventDefault()

    const url = "http://localhost:8000/user/" + updateUserInfo['id']

    const response = await fetch(url, {
      method: "PUT",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: updateUserInfo['username'],
        email: updateUserInfo['email'],
        password: updateUserInfo['password']
      })
    })

    response.json().then(resp => {
      if (resp.status === 'ok' ) {
        toast.success("User updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Adjust the duration as needed
        });
      } else {
        alert("Failed to update User")
      }
    })

    setUpdateUserInfo({
      username: "",
      email:"",
      password: "",
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
      <TableCell>{username}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{password}</TableCell>
      <TableCell>
        <Button variant="outlined" color="primary" onClick={() => handleUpdateAndOpenDialog(id)}>Update</Button>
        <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>Delete</Button>
      </TableCell>
    </TableRow>
    <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} aria-labelledby="form-dialog-title">
    <DialogTitle>Edit User</DialogTitle>
    <DialogContent>
      <>
        <TextField label="Username" name="username" value={updateUserInfo.username} onChange={updateField} fullWidth />
        <TextField label="Email" name="email" value={updateUserInfo.email} onChange={updateField} fullWidth />
        <TextField label="Password" name="password" value={updateUserInfo.password} onChange={updateField} fullWidth />
      </>
    </DialogContent>
    <Button onClick={postData}>Edit</Button>
    </Dialog>
    </>
  );
}

export default UsersRow;
