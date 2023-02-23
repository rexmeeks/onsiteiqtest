import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {UserInfo} from "./components/UserInfo";
import {CandidatesList} from "./components/CandidatesList";

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<UserInfo/>} exact/>
              <Route path="/previousCandidates" element={CandidatesList}/>
          </Routes>
      </div>
  );
}

export default App;
