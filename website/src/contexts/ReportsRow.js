import { TableRow, TableCell, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { UpdateReportContext } from './updateReportContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReportsRow = ({ id, user_id, comment, handleDelete, handleUpdate }) => {
  
  const [updateReportInfo, setUpdateReportInfo] = useContext(UpdateReportContext)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateField = (e) => {
    setUpdateReportInfo({...updateReportInfo, [e.target.name]: e.target.value})
  }

  const postData = async (e) => {
    e.preventDefault()

    const url = "http://localhost:8000/report/" + updateReportInfo['id']

    const response = await fetch(url, {
      method: "PUT",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: updateReportInfo['user_id'],
        comment: updateReportInfo['comment']
      })
    })

    response.json().then(resp => {
      if (resp.status === 'ok' ) {
        toast.success("Report updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Adjust the duration as needed
        });
      } else {
        alert("Failed to update Report")
      }
    })

    setUpdateReportInfo({
      user_id: "",
      comment:"",
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
      <TableCell>{comment}</TableCell>
      <TableCell>
        <Button variant="outlined" color="primary" onClick={() => handleUpdateAndOpenDialog(id)}>Update</Button>
        <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>Delete</Button>
      </TableCell>
    </TableRow>
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} aria-labelledby="form-dialog-title">
        <DialogTitle>Edit Report</DialogTitle>
        <DialogContent>
          <>
            <TextField label="User_id" name="user_id" value={updateReportInfo.name} onChange={updateField} fullWidth />
            <TextField label="Comment" name="comment" value={updateReportInfo.image} onChange={updateField} fullWidth />
          </>
        </DialogContent>
        <Button onClick={postData}>Edit</Button>
        </Dialog>
      </>
);
}

export default ReportsRow;
