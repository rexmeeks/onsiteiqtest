import {List, ListItem, ListItemText} from "@mui/material";

export function CandidatesList(props) {
    const candidates = JSON.parse(localStorage.getItem('persons'));

    return (
        <>
            <List>
                {candidates?.map(candidate => {
                    return (<ListItem>
                        <ListItemText>
                            {candidate?.name?.first} {candidate?.name?.last}
                        </ListItemText>
                    </ListItem>)
                })}
            </List>
        </>
    )
}