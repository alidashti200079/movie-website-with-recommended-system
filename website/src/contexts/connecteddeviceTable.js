import { useEffect, useContext } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, Typography } from '@mui/material';
import {ConnectedDeviceContext} from './connectedDeviceContext'
import DevicesRow from './DevicesRow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConnectedDeviceTable = () => {
    const [devices, setDevices] = useContext(ConnectedDeviceContext)

    const handleDelete = (id) => {
        fetch("http://localhost:8000/connecteddevice/" + id, {
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
                    const filteredDevices = devices.data.filter((device) => device.
                    id !== id);
                    setDevices({data: [...filteredDevices]})
                    toast.success("Device deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, // Adjust the duration as needed
                      });
                } else {
                    alert("Device deletion failed")
            }
        })
    }


    useEffect(() => {
        fetch("http://localhost:8000/connecteddevice")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
          setDevices({"data" : [...results.data]})
        })
      }, [])

    const deviceLength = devices.data.length > 0 ? devices.data.length: null;
    return(
        <div>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>User id</TableCell>
                    <TableCell>Device Name</TableCell>
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {devices.data.map((device) => (
                    <DevicesRow
                        id={device.id}
                        user_id={device.user_id}
                        device_name={device.device_name}
                        key={device.id}
                        handleDelete = {handleDelete}
                    />               
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" gutterBottom style={{display: 'flex', justifyContent:'flex-end', margin:'5px 40px 0 0'}}>
                Number of devices : <Badge style={{ margin:' 15px  0  0 15px'}} badgeContent={deviceLength} color="primary" />
            </Typography>
            <ToastContainer />
        </div>
  
    )
    
}

export default ConnectedDeviceTable;