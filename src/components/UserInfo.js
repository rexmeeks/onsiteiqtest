import {useEffect, useState} from 'react'
import {Box, Button, Grid, Modal, Typography} from "@mui/material";
import {OptionalComments} from "./OptionalComments";
import axios from "axios";
import {CandidatesList} from "./CandidatesList";

export function UserInfo(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(props.user ? props.user : {});
    const [userLocation, setUserLocation] = useState({});
    const [showCandidates, setShowCandidates] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if(!user) {
            axios.get(`https://randomuser.me/api/`)
                .then(res => {
                    const response = res.data?.results?.length > 0 ? res.data.results[0] : {}
                    setUser(response)
                    setUserLocation(response?.location)
                })
        }
    }, [user])

    const openModal = (event) => {
        setIsOpen(true);
        setUser({...user, "accepted": event.target.title === 'Accept'});
    }

    const showTheFuckingPage = () => {
        setShowCandidates(true)
    }

    const handleOptionalComments = (comments) => {
        setIsOpen(false);
        // todo save to local storage list
        const tempUser = {...user, "optionalComments": comments};
        // because state doesn't necessarily update right away
        setUser(tempUser);
        if(localStorage.getItem('persons')) {
            let users = JSON.parse(localStorage.getItem('persons'));
            users.push(tempUser);
            localStorage.setItem('persons', JSON.stringify(users));
        } else {
            let users = [tempUser];
            localStorage.setItem('persons', JSON.stringify(users));
        }
    }

    return (
        <>
            {!showCandidates ?
            <Box>
                <Box component={'img'} sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                }} src={user?.picture?.large}>
                </Box>
                <Grid container gridColumn={2} spacing={1}>
                    <Grid item xs={3}>
                        <Typography variant={'h5'}>Name:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography
                            variant={'h6'}> {user?.name?.title} {user?.name?.first} {user?.name?.last}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Gender:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant={'h6'}> {user?.gender} </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Email:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant={'h6'}> {user?.email} </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Cell Phone:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant={'h6'}> {user?.cell} </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Home Phone:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant={'h6'}> {user?.phone} </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Location:</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Street:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography
                            variant={'h6'}> {userLocation?.street?.number} {userLocation?.street?.name} </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>City:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant={'h6'}> {userLocation?.city} </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>State:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant={'h6'}> {userLocation?.state} </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Zip:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant={'h6'}> {userLocation?.postcode} </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Country:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant={'h6'}> {userLocation?.country} </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button title={'Accept'} color={'success'} onClick={(e) => openModal(e)}>Accept</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button title={'Reject'} color={'error'} onClick={(e) => openModal(e)}>Reject</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button title={'Candidates'} color={'success'} onClick={() => showTheFuckingPage()}>View Previous Candidates</Button>
                    </Grid>
                </Grid>
            </Box> : <CandidatesList/> }
                <Modal open={isOpen}>
                    <OptionalComments handleClose={handleClose} handleOptionalComments={handleOptionalComments}/>
                </Modal>
            </>
        )
}