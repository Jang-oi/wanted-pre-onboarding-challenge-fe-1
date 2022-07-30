import {BrowserRouter, Route, Routes} from "react-router-dom";

import axios from "axios";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import Menubar from "./components/Menubar";
import {TodoProvider} from "./context/todoContext";


function App() {

    axios.defaults.baseURL = `http://${window.location.hostname}:8080`;

    return (
        <TodoProvider>
            <BrowserRouter>
                <Menubar/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/signIn" element={<SignIn/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                </Routes>
            </BrowserRouter>
        </TodoProvider>
    );
}

export default App;