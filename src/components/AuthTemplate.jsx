import React, {useState} from "react";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AuthTemplate = ({type}) => {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email          : '',
        password       : '',
        emailDisable   : false,
        passwordDisable: false,
    });

    const {email, password, emailDisable, passwordDisable} = inputs;
    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const headerText = (type === 'create') ? '회원가입' : '로그인';

    /**
     * Input 값이 변경 될 때마다 진행되는 함수
     * 입력 값에 따라 회원가입 버튼에 대한 disable, validation 도 같이함.
     * @param e
     */
    const onInputChange = (e) => {
        const {name, value} = e.target;
        const disable = {emailDisable, passwordDisable};

        if (name === 'email') disable.emailDisable = regEmail.test(value);
        else disable.passwordDisable = value.length >= 8;

        setInputs({
            ...inputs,
            [name]            : value,
            [`${name}Disable`]: disable[`${name}Disable`]
        });
    };

    /**
     * 회원가입 버튼 클릭 시 진행되는 함수
     * e.response.data.details 는 백단에서 벨리데이션 체크 시 던져주는 메세지
     * @returns {Promise<void>}
     */
    const onSubmit = async () => {
        try {
            const response = await axios.post(`/users/${type}`, {email, password});
            const {message, token} = response.data;
            alert(message);
            if (type === 'create') navigate('/signUp');
            if (type === 'login') {
                navigate('/');
                localStorage.setItem('token', token);
            }
        } catch (e) {
            const errorMsg = e.response.data.details;
            alert(errorMsg);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop    : 8,
                    display      : 'flex',
                    flexDirection: 'column',
                    alignItems   : 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {headerText}
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={onInputChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={onSubmit}
                        disabled={!emailDisable || !passwordDisable}
                    >
                        {headerText}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AuthTemplate;