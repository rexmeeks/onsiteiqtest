import './App.css';
import {UserInfo} from "./components/UserInfo";
import {Route, Routes} from "react-router-dom";
import {CandidatesList} from "./components/CandidatesList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
