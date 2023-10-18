import { TableRow, TableCell, Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const FavoritesRow = ({ id, user_id, video_id, handleDelete }) => {

  return (
    <>
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{user_id}</TableCell>
      <TableCell>{video_id}</TableCell>
      <TableCell>
        <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>Delete</Button>
      </TableCell>
    </TableRow>
      </>
);
}

export default FavoritesRow;
