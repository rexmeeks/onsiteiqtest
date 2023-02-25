import './App.css';
import {UserInfo} from "./components/UserInfo";
import {Route, Routes} from "react-router-dom";
import {CandidatesList} from "./components/CandidatesList";
import {Typography} from "@mui/material";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Typography variant={'h3'} sx={{mt: 1, mb: 2, alignItems: 'center', textAlign: 'center'}}>HR Application Portal</Typography>
                <Routes>
                    <Route path={'/'} element={<UserInfo/>}/>
                    <Route path={'/:userId'} element={<UserInfo/>}/>
                    <Route path={'/previousCandidates'} element={<CandidatesList/>}/>
                </Routes>
            </header>
        </div>
    );
}

export default App;
