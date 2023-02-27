import {Box, Button, Grid, IconButton, TextField} from "@mui/material";
import {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '90vw', sm: '80vw', md: '50vw'},
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function OptionalComments(props) {

    const [comments, setComments] = useState(null)

    // pretty simple modal that just lets you type in a comment about the viewed user
    return (
        <>
            <Box sx={style}>
                <Grid container alignItems={'center'}>
                    <Grid item xs={1}>
                        <IconButton onClick={props.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={11} sx={{ml: 'auto'}}>
                        <h1>Optional Comments</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name={'Comments'} value={comments} onChange={(event => setComments(event.target.value))}
                                   placeholder={'Enter any comments about the candidate (optional)'} fullWidth multiline/>
                    </Grid>
                    <Grid item>
                        <Button name={'Submit'} color={'success'}
                                onClick={() => props.handleOptionalComments(comments)}>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}