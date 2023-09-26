import { useEffect, useContext} from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, Typography } from '@mui/material';
import {UserContext} from './userContext'
import UsersRow from './UsersRow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateUserContext } from './updateUserContext';

const UsersTable = () => {
    const [users, setUsers] = useContext(UserContext)
    const [updateUserInfo, setUpdateUserInfo] = useContext(UpdateUserContext)

    const handleDelete = (id) => {
        fetch("http://localhost:8000/user/" + id, {
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
                    const filteredUsers = users.data.filter((user) => user.
                    id !== id);
                    setUsers({data: [...filteredUsers]})
                    toast.success("User deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, // Adjust the duration as needed
                      });
                } else {
                    alert("User deletion failed")
            }
        })
    }

    const handleUpdate = (id) => {
        const user = users.data.filter(user => user.id === id)[0]
        setUpdateUserInfo({
            username: user.username,
            email: user.email,
            password: user.password,
            id: id
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/user")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
            setUsers({"data" : [...results.data]})
        })
      }, [updateUserInfo])

    const usersLength = users.data.length > 0 ? users.data.length: null;
    return(
        <div>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.data.map((user) => (
                    <UsersRow
                        id={user.id}
                        username={user.username}
                        email={user.email}
                        password={user.password}
                        key={user.id}
                        handleDelete = {handleDelete}
                        handleUpdate = {handleUpdate}
                    />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" gutterBottom style={{display: 'flex', justifyContent:'flex-end', margin:'5px 40px 0 0'}}>
                Number of users : <Badge style={{ margin:' 15px  0  0 15px'}} badgeContent={usersLength} color="primary" />
            </Typography>
            <ToastContainer />
        </div>
  
    )
    
}

export default UsersTable;