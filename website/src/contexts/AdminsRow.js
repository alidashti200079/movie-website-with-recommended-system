import { TableRow, TableCell, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { UpdateAdminContext } from './updateAdminContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminsRow = ({ id, username, email, password, handleDelete, handleUpdate }) => {

  const [updateAdminInfo, setUpdateAdminInfo] = useContext(UpdateAdminContext)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateField = (e) => {
    setUpdateAdminInfo({...updateAdminInfo, [e.target.name]: e.target.value})
  }

  const postData = async (e) => {
    e.preventDefault()

    const url = "http://localhost:8000/admin/" + updateAdminInfo['id']

    const response = await fetch(url, {
      method: "PUT",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: updateAdminInfo['username'],
        email: updateAdminInfo['email'],
        password: updateAdminInfo['password']
      })
    })

    response.json().then(resp => {
      if (resp.status === 'ok' ) {
        toast.success("Admin updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Adjust the duration as needed
        });
      } else {
        alert("Failed to update Admin")
      }
    })

    setUpdateAdminInfo({
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
    <DialogTitle>Edit Admin</DialogTitle>
    <DialogContent>
      <>
        <TextField label="Username" name="username" value={updateAdminInfo.username} onChange={updateField} fullWidth />
        <TextField label="Email" name="email" value={updateAdminInfo.email} onChange={updateField} fullWidth />
        <TextField label="Password" name="password" value={updateAdminInfo.password} onChange={updateField} fullWidth />
      </>
    </DialogContent>
    <Button onClick={postData}>Edit</Button>
    </Dialog>
    </>
  );
}

export default AdminsRow;
