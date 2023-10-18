import { useEffect, useContext } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, Typography } from '@mui/material';
import {VotedContext} from './votedContext'
import VotesRow from './VotesRow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateVotedContext } from './updateVotedContext';

const VotedTable = () => {
    const [votes, setVotes] = useContext(VotedContext)
    const [updateVoteInfo, setUpdateVoteInfo] = useContext(UpdateVotedContext)

    const handleDelete = (id) => {
        fetch("http://localhost:8000/voted/" + id, {
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
                    const filteredVotes = votes.data.filter((vote) => vote.
                    id !== id);
                    setVotes({data: [...filteredVotes]})
                    toast.success("Vote deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, // Adjust the duration as needed
                      });
                } else {
                    alert("Vote deletion failed")
            }
        })
    }

    const handleUpdate = (id) => {
        const vote = votes.data.filter(vote => vote.id === id)[0]
        setUpdateVoteInfo({
            user_id: vote.user_id,
            movie_id: vote.movie_id,
            user_rating: vote.user_rating,
            id: id
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/voted")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
          setVotes({"data" : [...results.data]})
        })
      }, [updateVoteInfo])

    const voteLength = votes.data.length > 0 ? votes.data.length: null;
    return(
        <div>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>User id</TableCell>
                    <TableCell>Movie id</TableCell>
                    <TableCell>User rating</TableCell>
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {votes.data.map((vote) => (
                    <VotesRow
                        id={vote.id}
                        user_id={vote.user_id}
                        movie_id={vote.movie_id}
                        user_rating={vote.user_rating}
                        key={vote.id}
                        handleDelete = {handleDelete}
                        handleUpdate = {handleUpdate}
                    />               
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" gutterBottom style={{display: 'flex', justifyContent:'flex-end', margin:'5px 40px 0 0'}}>
                Number of votes : <Badge style={{ margin:' 15px  0  0 15px'}} badgeContent={voteLength} color="primary" />
            </Typography>
            <ToastContainer />
        </div>
  
    )
    
}

export default VotedTable;