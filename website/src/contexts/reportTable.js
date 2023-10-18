import { useEffect, useContext } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, Typography } from '@mui/material';
import {ReportContext} from './reportContext'
import ReportsRow from './ReportsRow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateReportContext } from './updateReportContext';

const ReportsTable = () => {
    const [reports, setReports] = useContext(ReportContext)
    const [updateReportInfo, setUpdateReportInfo] = useContext(UpdateReportContext)

    const handleDelete = (id) => {
        fetch("http://localhost:8000/report/" + id, {
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
                    const filteredReports = reports.data.filter((report) => report.
                    id !== id);
                    setReports({data: [...filteredReports]})
                    toast.success("Report deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, // Adjust the duration as needed
                      });
                } else {
                    alert("Report deletion failed")
            }
        })
    }

    const handleUpdate = (id) => {
        const report = reports.data.filter(report => report.id === id)[0]
        setUpdateReportInfo({
            user_id: report.user_id,
            comment: report.comment,
            id: id
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/report")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
          setReports({"data" : [...results.data]})
        })
      }, [updateReportInfo])

    const reportLength = reports.data.length > 0 ? reports.data.length: null;
    return(
        <div>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>User id</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports.data.map((report) => (
                    <ReportsRow
                        id={report.id}
                        user_id={report.user_id}
                        comment={report.comment}
                        key={report.id}
                        handleDelete = {handleDelete}
                        handleUpdate = {handleUpdate}
                    />               
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" gutterBottom style={{display: 'flex', justifyContent:'flex-end', margin:'5px 40px 0 0'}}>
                Number of reports : <Badge style={{ margin:' 15px  0  0 15px'}} badgeContent={reportLength} color="primary" />
            </Typography>
            <ToastContainer />
        </div>
  
    )
    
}

export default ReportsTable;