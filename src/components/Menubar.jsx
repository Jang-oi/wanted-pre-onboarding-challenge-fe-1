import {Fragment} from "react";
import {Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Menubar = () => {

    const navigate = useNavigate();
    const isToken = localStorage.getItem('token');
    /**
     * url을 입력하면 페이지로 이동
     * @param e
     */
    const movePage = (e) => {
        const {value} = e.target;
        navigate(value);
    }

    /**
     * 로그아웃 버튼 클릭 시 진행되는 함수
     */
    const onLogOut = () => {
        if (window.confirm('로그아웃 하시겠습니까??')) {
            localStorage.removeItem('token');
            navigate('/signUp');
        }
    }

    /**
     * 로그인 여부를 통해 조회되는 메뉴 리턴
     * @returns {JSX.Element}
     */
    const getMenuElement = () => {
        return isToken ?
            <Fragment>
                <Button onClick={onLogOut}>LogOut</Button>
            </Fragment>
            :
            <Fragment>
                <Button value={'/signIn'} onClick={movePage}>Sign In</Button>
                <Button value={'/signUp'} onClick={movePage}>Sign Up</Button>
            </Fragment>
    }


    return (
        <Fragment>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Button value={'/'} onClick={movePage}>{'ToDo List'}</Button>
                <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{flex: 1}}/>
                {getMenuElement()}
            </Toolbar>
        </Fragment>
    )
}

export default Menubar;