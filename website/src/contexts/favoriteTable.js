import { useEffect, useContext } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, Typography } from '@mui/material';
import {FavoriteContext} from './favoriteContext'
import FavoritesRow from './FavoritesRow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FavoriteTable = () => {
    const [favorites, setFavorites] = useContext(FavoriteContext)

    const handleDelete = (id) => {
        fetch("http://localhost:8000/favorite/" + id, {
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
                    const filteredFavorites = favorites.data.filter((favorite) => favorite.
                    id !== id);
                    setFavorites({data: [...filteredFavorites]})
                    toast.success("Favorite deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, // Adjust the duration as needed
                      });
                } else {
                    alert("Favorite deletion failed")
            }
        })
    }


    useEffect(() => {
        fetch("http://localhost:8000/favorite")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
          setFavorites({"data" : [...results.data]})
        })
      }, [])

    const favoriteLength = favorites.data.length > 0 ? favorites.data.length: null;
    return(
        <div>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>User id</TableCell>
                    <TableCell>Video id</TableCell>
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {favorites.data.map((favorite) => (
                    <FavoritesRow
                        id={favorite.id}
                        user_id={favorite.user_id}
                        video_id={favorite.video_id}
                        key={favorite.id}
                        handleDelete = {handleDelete}
                    />               
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" gutterBottom style={{display: 'flex', justifyContent:'flex-end', margin:'5px 40px 0 0'}}>
                Number of favorites : <Badge style={{ margin:' 15px  0  0 15px'}} badgeContent={favoriteLength} color="primary" />
            </Typography>
            <ToastContainer />
        </div>
  
    )
    
}

export default FavoriteTable;