import {
    Box, Button,
    Card,
    CardContent,
    Grid, IconButton,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

export function CandidatesList(props) {
    const candidates = JSON.parse(localStorage.getItem('persons'));
    const navigate = useNavigate()

    return (
        <>
            <Grid container spacing={2} sx={{mt: 1, mb: 1, alignItems: 'center', justifyContent: 'center', width: {xs: '95vw', sm: '80vw', md:'50vw'}}}>
                <Grid item justifyContent={'flex-start'}>
                    <Button title={'Back'} variant={'outlined'} onClick={() => navigate(-1)}>Back</Button>
                </Grid>
                <Grid item>
                    <Typography variant={'h5'} className='App-info'>Previous Candidates</Typography>
                </Grid>
            </Grid>
            <List>
                {candidates?.map(candidate => {
                    return (<ListItem>
                            <Link to={`/${candidate.id}`} style={{textDecoration: 'none'}}>
                                <Card sx={{backgroundColor: '#2f343e', color:'white', maxWidth: '95vw', width: {xs: '95vw', sm: '80vw', md:'50vw'}}}>
                                    <CardContent>
                                        <Grid container spacing={1} direction="row" alignItems="flex-start">
                                            <Grid container item justifyContent={"center"} xs={3}>
                                                {/*todo change img format stuff*/}
                                                <Box component={'img'} sx={{
                                                    height: 50,
                                                    width: 50,
                                                    maxHeight: {xs: 233, md: 167},
                                                    maxWidth: {xs: 350, md: 250},
                                                    alignItems: 'center'
                                                }} src={candidate?.picture?.medium}>
                                                </Box>
                                            </Grid>
                                            <Grid container item xs={9}>
                                                <Grid item xs={12}>
                                                    <Typography variant={'h4'}>{candidate?.name?.first} {candidate?.name?.last}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography sx={{fontStyle: 'italic' }} className={'App-info'}>{candidate?.location?.city}, {candidate?.location?.state}, {candidate?.location?.country}</Typography>
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