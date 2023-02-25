import {useEffect, useState} from 'react'
import {Box, Button, Grid, Modal, Typography} from "@mui/material";
import {OptionalComments} from "./OptionalComments";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';
import {nanoid} from "nanoid";

const subtitleStyle = {mr: 1, fontWeight: 'bold'};

export function UserInfo(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [userLocation, setUserLocation] = useState({});
    const navigate = useNavigate();
    const [userId, setUserId] = useState(useParams()?.userId);
    const [user, setUser] = useState(null);

    const getUserById = (id) => {
        const users = JSON.parse(localStorage.getItem('persons'));
        return users.find(user => user.id === id);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if(!userId && !!JSON.parse(localStorage.getItem('currentUser'))) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            setUser(currentUser);
            setUserLocation(currentUser?.location)
        }
        else if (!user) {
            if (userId) {
                const foundUser = getUserById(userId);
                setUser(foundUser);
                setUserLocation(foundUser.location);
                localStorage.setItem('currentUser', JSON.stringify(foundUser));
            } else {
                    axios.get(`https://randomuser.me/api/`)
                        .then(res => {
                            const response = res.data?.results?.length > 0 ? res.data.results[0] : {};
                            const temp = {...response, "id": nanoid()};
                            setUser(temp);
                            setUserLocation(response?.location);
                            localStorage.setItem('currentUser', JSON.stringify(temp));
                        })

            }
        }
    }, [user, userId])

    const openModal = (event) => {
        setIsOpen(true);
        setUser({...user, "accepted": event.target.title === 'Accept'});
    }

    const handleOptionalComments = (comments) => {
        setIsOpen(false);
        // because state doesn't necessarily update right away and from this point on we're only adding to local storage
        // need most up to date guaranteed
        const newUser = {...user, "optionalComments": comments};
        if (localStorage.getItem('persons')) {
            if (userId) {
                updateUserById(userId, newUser);
            } else {
                let users = JSON.parse(localStorage.getItem('persons'));
                users.push(newUser);
                localStorage.setItem('persons', JSON.stringify(users));
            }
        } else {
            let users = [newUser];
            localStorage.setItem('persons', JSON.stringify(users));
        }
        setUser(null);
        setUserId(null);
        localStorage.removeItem('currentUser');
        navigate('/');
    }

    const navigateToPreviousCandidates = () => {
        navigate('/previousCandidates');
    }

    const updateUserById = (id, updatedUser) => {
        let users = JSON.parse(localStorage.getItem('persons')).filter(user => user.id !== id);
        users.push(updatedUser);
        localStorage.setItem('persons', JSON.stringify(users));
    }

    return (
        <>
            <Box>
                <Grid container spacing={1}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      style={{minHeight: '80vh'}}>
                    <Grid container gridColumn={3} spacing={1} direction="row"
                          sx={{width: {xs: '95vw', md: '90vw'}, alignItems: {xs:'center'}, justifyContent: {xs: 'center', md: 'flex-start'}, mb: 1}}>
                        <Grid container item sm={12} md={3} sx={{justifyContent: {xs: 'center', md: 'flex-start'}}}>
                            <Box component={'img'} sx={{
                                height: 233,
                                width: 350,
                                maxHeight: {xs: 233, md: 167},
                                maxWidth: {xs: 350, md: 250},
                                alignItems: 'right'
                            }} src={user?.picture?.large}>
                            </Box>
                        </Grid>
                        <Grid container item xs={12} sm={9} sx={{justifyContent: {sm: 'center', md: 'flex-start'}, alignItems: {xs: 'center'}}}>
                            <Grid item xs={12} md={6} >
                                <Grid item sx={{display: 'flex'}}>
                                    <Typography sx={subtitleStyle}>Name: </Typography><Typography
                                    className={"App-info"}> {user?.name?.title} {user?.name?.first} {user?.name?.last}</Typography>
                                </Grid>
                                <Grid item sx={{display: 'flex'}}>
                                    <Typography sx={subtitleStyle}>Gender: </Typography><Typography
                                    className={"App-info"}>{user?.gender}</Typography>
                                </Grid>
                                <Grid item sx={{display: 'flex'}}>
                                    <Typography sx={subtitleStyle}>Email: </Typography><Typography
                                    className={"App-info"}>{user?.email}</Typography>
                                </Grid>
                                <Grid item sx={{display: 'flex'}}>
                                    <Typography sx={subtitleStyle}>Cell Phone: </Typography><Typography
                                    className={"App-info"}>{user?.cell}</Typography>
                                </Grid>
                                <Grid item sx={{display: 'flex'}}>
                                    <Typography sx={subtitleStyle}>Home Phone: </Typography><Typography
                                    className={"App-info"}>{user?.phone}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid item sx={{display: 'flex'}} alignItems="end">
                                    <Typography sx={subtitleStyle}>Street: </Typography><Typography
                                    className={"App-info"}>{userLocation?.street?.number} {userLocation?.street?.name}</Typography>
                                </Grid>
                                <Grid item sx={{display: 'flex'}} alignItems="end">
                                    <Typography sx={subtitleStyle}>City: </Typography><Typography
                                    className={"App-info"}>{userLocation?.city}</Typography>
                                </Grid>
                                <Grid item sx={{display: 'flex'}} alignItems="end">
                                    <Typography sx={subtitleStyle}>State: </Typography><Typography
                                    className={"App-info"}>{userLocation?.state}</Typography>
                                </Grid>
                                <Grid item sx={{display: 'flex'}} alignItems="end">
                                    <Typography sx={subtitleStyle}>Zip: </Typography><Typography
                                    className={"App-info"}>{userLocation?.postcode}</Typography>
                                </Grid>
                                <Grid item sx={{display: 'flex'}} alignItems="end">
                                    <Typography sx={subtitleStyle}>Country: </Typography><Typography
                                    className={"App-info"}>{userLocation?.country}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                <Grid container spacing={1}>
                    <Grid container item xs={6} md={4} justifyContent={'flex-end'}>
                        <Button name={'Accept'} color={'success'} variant={'contained'} onClick={(e) => openModal(e)}>Accept</Button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Button name={'Reject'} color={'error'} variant={'outlined'} onClick={(e) => openModal(e)}>Reject</Button>
                    </Grid>
                    <Grid container item xs={12} md={4} sx={{justifyContent: {xs: 'center', md: 'flex-start'}}}>
                        <Button name={'Candidates'} color={'success'} onClick={() => navigateToPreviousCandidates()}>View
                            Previous Candidates</Button>
                    </Grid>
                </Grid>
                </Grid>
            </Box>
                <Modal open={isOpen}>
                    <OptionalComments handleClose={handleClose} handleOptionalComments={handleOptionalComments}/>
                </Modal>
            </>
        )
}