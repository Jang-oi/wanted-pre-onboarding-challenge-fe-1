import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import axios from "axios";
import {API_URL} from "./utils/setting";

function App() {

    axios.defaults.baseURL = API_URL.backUrl;

    return (
        <Router>
            <Routes>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
            </Routes>
        </Router>
    );
}

export default App;
