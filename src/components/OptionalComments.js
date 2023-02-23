import {Box, Button, IconButton, TextField} from "@mui/material";
import {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function OptionalComments(props) {

    const [comments, setComments] = useState(null)

    return (
        <>
                <Box sx={style}>
                    <IconButton onClick={props.handleClose}>
                        <CloseIcon/>
                    </IconButton>
                    <h1>Optional Comments:</h1>
                    <TextField value={comments} onChange={(event => setComments(event.target.value))} placeholder={'Enter any comments about the candidate (optional)'}></TextField>
                    <Button title={'Submit'} color={'success'} onClick={() => props.handleOptionalComments(comments)}>Submit</Button>
                </Box>
        </>
    )
}