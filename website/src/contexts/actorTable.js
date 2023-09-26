import { useEffect, useContext} from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, Typography } from '@mui/material';
import {ActorContext} from './actorContext'
import ActorsRow from './ActorsRow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateActorContext } from './updateActorContext';

const ActorsTable = () => {
    const [actors, setActors] = useContext(ActorContext)
    const [updateActorInfo, setUpdateActorInfo] = useContext(UpdateActorContext)

    const handleDelete = (id) => {
        fetch("http://localhost:8000/actor/" + id, {
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
                    const filteredActors = actors.data.filter((actor) => actor.
                    id !== id);
                    setActors({data: [...filteredActors]})
                    toast.success("Actor deleted", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, // Adjust the duration as needed
                      });
                } else {
                    alert("Actor deletion failed")
            }
        })
    }

    const handleUpdate = (id) => {
        const actor = actors.data.filter(actor => actor.id === id)[0]
        setUpdateActorInfo({
            name: actor.name,
            image: actor.image,
            description: actor.description,
            id: id
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/actor")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
            setActors({"data" : [...results.data]})
        })
      }, [updateActorInfo])

    const actorsLength = actors.data.length > 0 ? actors.data.length: null;
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
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {actors.data.map((actor) => (
                    <ActorsRow
                        id={actor.id}
                        name={actor.name}
                        image={actor.image}
                        description={actor.description}
                        key={actor.id}
                        handleDelete = {handleDelete}
                        handleUpdate = {handleUpdate}
                    />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" gutterBottom style={{display: 'flex', justifyContent:'flex-end', margin:'5px 40px 0 0'}}>
                Number of actors : <Badge style={{ margin:' 15px  0  0 15px'}} badgeContent={actorsLength} color="primary" />
            </Typography>
            <ToastContainer />
        </div>
  
    )
    
}

export default ActorsTable;





