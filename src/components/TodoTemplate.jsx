import React from "react";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import {Container, Paper, Typography} from "@mui/material";
import TodoDetail from "./TodoDetail";

const TodoTemplate = () => {
    return (
        <Container component="main" maxWidth="md" sx={{mb: 4}}>
            <TodoDetail/>
            <Paper variant="outlined" sx={{my: 6, p: 3}}>
                <Typography component="h1" variant="h3" align="center">{'TODO-LIST'}</Typography>
                <TodoCreate/>
                <TodoList/>
            </Paper>
        </Container>
    );
}

export default TodoTemplate;