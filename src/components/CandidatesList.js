import {
    Box, Button,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

export function CandidatesList(props) {
    const candidates = JSON.parse(localStorage.getItem('persons'));
    const navigate = useNavigate()

    // all I'm doing here is getting the list of users from local storage and then taking each user and mapping them
    // to a card component within a list. Where each card will have some basic user information and the whole card
    // will be clickable
    return (
        <>
            <Grid container spacing={2} sx={{mt: 1, mb: 1, alignItems: 'center', justifyContent: 'center', width: {xs: '95vw', sm: '80vw', md:'50vw'}}}>
                <Grid item justifyContent={'flex-start'}>
                    <Button name={'Back'} variant={'outlined'} onClick={() => navigate(-1)}>Back</Button>
                </Grid>
                <Grid item>
                    <Typography variant={'h5'} className='App-info'>Previous Candidates</Typography>
                </Grid>
            </Grid>
            <List>
                {candidates?.map(candidate => {
                    return (<ListItem key={candidate.id}>
                            <Link data-testid='candidate-link' to={`/${candidate.id}`} style={{textDecoration: 'none'}}>
                                <Card sx={{backgroundColor: candidate?.accepted ? '#72b56e' : '#ff4c4c', color:'white', maxWidth: '95vw', width: {xs: '95vw', sm: '80vw', md:'50vw'}}}>
                                    <CardContent>
                                        <Grid container spacing={1} direction="row" alignItems="flex-start">
                                            <Grid container item justifyContent={"center"} xs={3}>
                                                <Box component={'img'} sx={{
                                                    height: 50,
                                                    width: 50,
                                                    maxHeight: {xs: 233, md: 167},
                                                    maxWidth: {xs: 350, md: 250},
                                                    alignItems: 'center',
                                                }}
                                                     alt={candidate?.name?.first + ' ' + candidate?.name?.last}
                                                     src={candidate?.picture?.medium}>
                                                </Box>
                                            </Grid>
                                            <Grid container item xs={9}>
                                                <Grid item xs={12}>
                                                    <Typography variant={'h4'}>{candidate?.name?.first} {candidate?.name?.last}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>Comments:</Typography>
                                                </Grid>
                                                <Grid item xs={12} zeroMinWidth>
                                                    <Typography sx={{fontStyle: 'italic', color: '#282c34'}}>{candidate?.optionalComments}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Link>
                        </ListItem>
                    )
                })}
                    </List>
                    </>
                    )
}