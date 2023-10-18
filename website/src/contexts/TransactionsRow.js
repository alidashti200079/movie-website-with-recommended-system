import { TableRow, TableCell, Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const TransactionsRow = ({ id, user_id, payment_amount, payment_time, handleDelete }) => {

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{user_id}</TableCell>
      <TableCell>{payment_amount}</TableCell>
      <TableCell>{payment_time}</TableCell>
      <TableCell>
        <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>Delete</Button>
      </TableCell>
    </TableRow>
);
}

export default TransactionsRow;
