import { useEffect, useContext } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, Typography } from '@mui/material';
import { TransactionContext } from './transactionContext'
import TransactionsRow from './TransactionsRow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionTable = () => {
    const [transactions, setTransactions] = useContext(TransactionContext)

    const handleDelete = (id) => {
        fetch("http://localhost:8000/transactionhistory/" + id, {
            method: "DELETE",
            headers: {
                acceot: 'application/json'
            }
        })
            .then(resp => {
                return resp.json()
            })
            .then(result => {
                if (result.status === 'ok') {
                    const filteredTransactions = transactions.data.filter((transaction) => transaction.
                    id !== id);
                    setTransactions({data: [...filteredTransactions]})
                    toast.success("Transaction deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, // Adjust the duration as needed
                      });
                } else {
                    alert("Transaction deletion failed")
            }
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/transactionhistory")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
          setTransactions({"data" : [...results.data]})
        })
      }, [setTransactions])

    const transactionsLength = transactions.data.length > 0 ? transactions.data.length: null;
    return(
        <div>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>User id</TableCell>
                    <TableCell>Payment amount</TableCell>
                    <TableCell>Payment time</TableCell>
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.data.map((transaction) => (
                    <TransactionsRow
                        id={transaction.id}
                        user_id={transaction.user_id}
                        payment_amount={transaction.payment_amount}
                        payment_time={transaction.payment_time}
                        key={transaction.id}
                        handleDelete = {handleDelete}
                    />               
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" gutterBottom style={{display: 'flex', justifyContent:'flex-end', margin:'10px 30px 0 0'}}>
                Number of transactions : <Badge style={{ margin:' 15px  0  0 15px'}} badgeContent={transactionsLength} color="primary" />
            </Typography>
            <ToastContainer />
        </div>
  
    )
    
}

export default TransactionTable;