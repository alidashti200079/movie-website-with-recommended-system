import { useEffect, useContext} from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, Typography } from '@mui/material';
import {SerieContext} from './serieContext'
import SeriesRow from './SeriesRow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateSerieContext } from './updateSerieContext';

const SeriesTable = () => {
    const [series, setSeries] = useContext(SerieContext)
    const [updateSerieInfo, setUpdateSerieInfo] = useContext(UpdateSerieContext)

    const handleDelete = (id) => {
        fetch("http://localhost:8000/series/" + id, {
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
                    const filteredSeries = series.data.filter((serie) => serie.
                    id !== id);
                    setSeries({data: [...filteredSeries]})
                    toast.success("Serie deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, // Adjust the duration as needed
                      });
                } else {
                    alert("Serie deletion failed")
            }
        })
    }

    const handleUpdate = (id) => {
        const serie = series.data.filter(serie => serie.id === id)[0]
        setUpdateSerieInfo({
            name: serie.name,
            image: serie.image,
            description: serie.description,
            genre: serie.genre,
            rating: serie.rating,
            id: id
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/series")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
            setSeries({"data" : [...results.data]})
        })
      }, [updateSerieInfo])

    const seriesLength = series.data.length > 0 ? series.data.length: null;
    return(
        <div>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {series.data.map((serie) => (
                    <SeriesRow
                        id={serie.id}
                        name={serie.name}
                        image={serie.image}
                        description={serie.description}
                        genre={serie.genre}
                        rating={serie.rating}
                        key={serie.id}
                        handleDelete = {handleDelete}
                        handleUpdate = {handleUpdate}
                    />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" gutterBottom style={{display: 'flex', justifyContent:'flex-end', margin:'5px 40px 0 0'}}>
                Number of series : <Badge style={{ margin:' 15px  0  0 15px'}} badgeContent={seriesLength} color="primary" />
            </Typography>
            <ToastContainer />
        </div>
  
    )
    
}

export default SeriesTable;





