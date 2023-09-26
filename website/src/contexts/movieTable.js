import { useEffect, useContext } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, Typography } from '@mui/material';
import {MovieContext} from './movieContext'
import MoviesRow from './MoviesRow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateMovieContext } from './updateMovieContext';

const MoviesTable = () => {
    const [movies, setMovies] = useContext(MovieContext)
    const [updateMovieInfo, setUpdateMovieInfo] = useContext(UpdateMovieContext)

    const handleDelete = (id) => {
        fetch("http://localhost:8000/movie/" + id, {
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
                    const filteredMovies = movies.data.filter((movie) => movie.
                    id !== id);
                    setMovies({data: [...filteredMovies]})
                    toast.success("Movie deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, // Adjust the duration as needed
                      });
                } else {
                    alert("Movie deletion failed")
            }
        })
    }

    const handleUpdate = (id) => {
        const movie = movies.data.filter(movie => movie.id === id)[0]
        setUpdateMovieInfo({
            name: movie.name,
            image: movie.image,
            description: movie.description,
            genre: movie.genre,
            rating: movie.rating,
            id: id
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/movie")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
          setMovies({"data" : [...results.data]})
        })
      }, [updateMovieInfo])

    const movieLength = movies.data.length > 0 ? movies.data.length: null;
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
                    {movies.data.map((movie) => (
                    <MoviesRow
                        id={movie.id}
                        name={movie.name}
                        image={movie.image}
                        description={movie.description}
                        genre={movie.genre}
                        rating={movie.rating}
                        key={movie.id}
                        handleDelete = {handleDelete}
                        handleUpdate = {handleUpdate}
                    />               
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" gutterBottom style={{display: 'flex', justifyContent:'flex-end', margin:'5px 40px 0 0'}}>
                Number of movies : <Badge style={{ margin:' 15px  0  0 15px'}} badgeContent={movieLength} color="primary" />
            </Typography>
            <ToastContainer />
        </div>
  
    )
    
}

export default MoviesTable;