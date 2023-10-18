import { useEffect, useContext } from 'react'
import {ProfileContext} from './profileContext'
import 'react-toastify/dist/ReactToastify.css';
import { UpdateProfileContext } from './updateProfileContext';  
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Divider,
  } from '@mui/material';
  import ProfilesRow from './profilesRow'

const ProfilesTable = () => {
    const [profiles, setProfiles] = useContext(ProfileContext)
    const [updateProfileInfo, setUpdateProfileInfo] = useContext(UpdateProfileContext)

    const handleUpdate = (id) => {
        const profile = profiles.data.filter(profile => profile.id === id)[0]
        setUpdateProfileInfo({
            user_id: profile.user_id,
            first_name: profile.first_name,
            last_name: profile.last_name,
            profile_photo: profile.profile_photo,
            id: id
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/userprofile")
        .then(resp => {
          return resp.json();
        }).then(results => {
            console.log(results)
            setProfiles({"data" : [...results.data]})
        })
      }, [updateProfileInfo])

    return(

      <div style={{ backgroundColor: '#eee' }}>
      <Container maxWidth="md" style={{ padding: '2rem' }}>
        <Grid container spacing={3}>
          {profiles.data.map((profile) => (
            <Grid item xs={12} sm={26} md={0} key={profile.id}>
              <Card sx={{ borderRadius: '15px' }}>
                <CardMedia
                  component="img"
                  src={profile.profile_photo}
                  alt="Profile Image"
                  sx={{ borderRadius: '50%', width: '200px', margin: '1.5rem auto' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">
                    {profile.first_name} {profile.last_name}
                  </Typography>
                  <ProfilesRow
                        id={profile.id}
                        user_id={profile.user_id}
                        first_name={profile.image}
                        last_name={profile.description}
                        profile_photo={profile.genre}
                        key={profile.id}
                        handleUpdate = {handleUpdate}
                    />  
                  <Divider />
                  <div>
                    <Typography variant="h5" sx={{ mb: '0.5rem' , mt: '0.5rem'}}>
                      {profile.user_id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: '0' }}>
                      User ID
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
    )
    
}

export default ProfilesTable;