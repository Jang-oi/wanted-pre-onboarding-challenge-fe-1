import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import TodoTemplate from "./TodoTemplate";

const Main = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            alert('로그인 정보가 없습니다.');
            navigate('/signUp');
        }
    }, [navigate, token])

    return <TodoTemplate/>
}

export default Main;