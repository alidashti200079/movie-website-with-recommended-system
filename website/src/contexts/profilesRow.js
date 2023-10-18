import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { UpdateProfileContext } from './updateProfileContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilesRow = ({ id, user_id, first_name, last_name, profile_photo, handleUpdate }) => {
  
  const [updateProfileInfo, setUpdateProfileInfo] = useContext(UpdateProfileContext)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateField = (e) => {
    setUpdateProfileInfo({...updateProfileInfo, [e.target.name]: e.target.value})
  }

  const postData = async (e) => {
    e.preventDefault()

    const url = "http://localhost:8000/userprofile/" + updateProfileInfo['id']

    const response = await fetch(url, {
      method: "PUT",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: updateProfileInfo['user_id'],
        first_name: updateProfileInfo['first_name'],
        last_name: updateProfileInfo['last_name'],
        profile_photo: updateProfileInfo['profile_photo']
      })
    })

    setUpdateProfileInfo({
      user_id: "",
      first_name:"",
      last_name: "",
      profile_photo: "",
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
    <Button variant="contained"  size="large" sx={{ mb: '2rem' ,  mt: '1rem' }} onClick={() => handleUpdateAndOpenDialog(id)}>Update</Button>
    <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} aria-labelledby="form-dialog-title">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <>
          <TextField label="User_id" name="user_id" value={updateProfileInfo.user_id} onChange={updateField} fullWidth />
          <TextField label="First_name" name="first_name" value={updateProfileInfo.first_name} onChange={updateField} fullWidth />
          <TextField label="Last_name" name="last_name" value={updateProfileInfo.last_name} onChange={updateField} fullWidth />
          <TextField label="Profile_photo" name="profile_photo" value={updateProfileInfo.profile_photo} onChange={updateField} fullWidth />
        </>
      </DialogContent>
      <Button onClick={postData}>Edit</Button>
      </Dialog>
      </>
);
}

export default ProfilesRow;
