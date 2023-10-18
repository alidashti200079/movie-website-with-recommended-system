import { TableRow, TableCell, Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const DevicesRow = ({ id, user_id, device_name, handleDelete }) => {

  return (
    <>
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{user_id}</TableCell>
      <TableCell>{device_name}</TableCell>
      <TableCell>
        <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>Delete</Button>
      </TableCell>
    </TableRow>
      </>
);
}

export default DevicesRow;
