import {BrowserRouter, Route, Routes} from "react-router-dom";

import {API_URL} from "./utils/setting";
import axios from "axios";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Main from "./components/Main";


function App() {

    axios.defaults.baseURL = API_URL.backUrl;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;