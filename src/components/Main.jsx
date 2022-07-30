import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import TodoTemplate from "./TodoTemplate";
import {token} from "../utils/common";

const Main = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert('로그인 정보가 없습니다.');
            navigate('/signUp');
        }
    }, [navigate])

    return <TodoTemplate/>
}

export default Main;