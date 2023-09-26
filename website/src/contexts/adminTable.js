import { useEffect, useContext, useState} from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, Typography } from '@mui/material';
import {AdminContext} from './adminContext'
import AdminsRow from './AdminsRow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateAdminContext } from './updateAdminContext';

const AdminsTable = () => {
    const [admins, setAdmins] = useContext(AdminContext)
    const [updateAdminInfo, setUpdateAdminInfo] = useContext(UpdateAdminContext)

    const handleDelete = (id) => {
        fetch("http://localhost:8000/admin/" + id, {
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
                    const filteredAdmins = admins.data.filter((admin) => admin.
                    id !== id);
                    setAdmins({data: [...filteredAdmins]})
                    toast.success("Admin deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, // Adjust the duration as needed
                      });
                } else {
                    alert("Admin deletion failed")
            }
        })
    }

    const handleUpdate = (id) => {
        const admin = admins.data.filter(admin => admin.id === id)[0]
        setUpdateAdminInfo({
            username: admin.username,
            email: admin.email,
            password: admin.password,
            id: id
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/admin")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
            setAdmins({"data" : [...results.data]})
        })
      }, [updateAdminInfo])

    const adminsLength = admins.data.length > 0 ? admins.data.length: null;
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
                    {admins.data.map((admin) => (
                    <AdminsRow
                        id={admin.id}
                        username={admin.username}
                        email={admin.email}
                        password={admin.password}
                        key={admin.id}
                        handleDelete = {handleDelete}
                        handleUpdate = {handleUpdate}
                    />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" gutterBottom style={{display: 'flex', justifyContent:'flex-end', margin:'5px 40px 0 0'}}>
                Number of admins : <Badge style={{ margin:' 15px  0  0 15px'}} badgeContent={adminsLength} color="primary" />
            </Typography>
            <ToastContainer />
        </div>
  
    )
    
}

export default AdminsTable;





