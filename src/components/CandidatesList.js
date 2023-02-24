import {List, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";

export function CandidatesList(props) {
    const candidates = JSON.parse(localStorage.getItem('persons'));

    return (
        <>
            <List>
                {candidates?.map(candidate => {
                    return (<ListItem>
                        <ListItemText>
                            <Link to={`/${candidate.id}`}>{candidate?.name?.first} {candidate?.name?.last}</Link>
                        </ListItemText>
                    </ListItem>)
                })}
            </List>
        </>
    )
}