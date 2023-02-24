import {useEffect, useState} from 'react'
import {Box, Button, Grid, Modal, Typography, useMediaQuery, useTheme} from "@mui/material";
import {OptionalComments} from "./OptionalComments";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';
import {nanoid} from "nanoid";

export function UserInfo(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
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
        if (!user) {
            if (userId) {
                const foundUser = getUserById(userId);
                setUser(foundUser);
                setUserLocation(foundUser.location);
            } else {
                axios.get(`https://randomuser.me/api/`)
                    .then(res => {
                        const response = res.data?.results?.length > 0 ? res.data.results[0] : {}
                        setUser({...response, "id": nanoid()})
                        setUserLocation(response?.location)
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
        navigate('/');
    }

    const updateUserById = (id, updatedUser) => {
        let users = JSON.parse(localStorage.getItem('persons')).filter(user => user.id !== id);
        users.push(updatedUser);
        localStorage.setItem('persons', JSON.stringify(users));
    }

    return (
        <>
            <Box>
                <Grid container gridColumn={3} spacing={1} direction="row" alignItems="flex-start" justifyContent="flex-start" sx={{width: '80vw'}}>
                    <Grid container item justifyContent={"flex-end"} md={3}>
                        <Box component={'img'} sx={{
                            height: 233,
                            width: 350,
                            maxHeight: {xs: 233, md: 167},
                            maxWidth: {xs: 350, md: 250},
                            alignItems: 'right'
                        }} src={user?.picture?.large}>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Grid item>
                            <Typography>Name: {user?.name?.title} {user?.name?.first} {user?.name?.last}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Gender: {user?.gender}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Email: {user?.email}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Cell Phone: {user?.cell}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Home Phone: {user?.phone}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item md={4}>
                        <Grid item>
                            <Typography>Street: {userLocation?.street?.number} {userLocation?.street?.name}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>City: {userLocation?.city}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>State: {userLocation?.state}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Zip: {userLocation?.postcode}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Country: {userLocation?.country}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid container item xs={6} md={4} justifyContent={'flex-end'}>
                        <Button title={'Accept'} color={'success'} onClick={(e) => openModal(e)}>Accept</Button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Button title={'Reject'} color={'error'} onClick={(e) => openModal(e)}>Reject</Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button title={'Candidates'} color={'success'} onClick={() => navigate('/previousCandidates')}>View
                            Previous Candidates</Button>
                    </Grid>
                </Grid>
            </Box>
                <Modal open={isOpen}>
                    <OptionalComments handleClose={handleClose} handleOptionalComments={handleOptionalComments}/>
                </Modal>
            </>
        )
}