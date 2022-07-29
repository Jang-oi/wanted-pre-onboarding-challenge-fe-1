import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Main = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('로그인 정보가 정상적이지 않습니다.');
            navigate('/signUp');
        }
    }, [navigate])

    return (
        <div>

        </div>
    );
}

export default Main;