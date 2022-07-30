import React from "react";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import {Container, Paper, Typography} from "@mui/material";

const TodoTemplate = () => {
    return (
        <Container component="main" maxWidth="md" sx={{mb: 4}}>
            <Paper variant="outlined" sx={{my: 6, p: 3}}>
                <Typography component="h1" variant="h3" align="center">{'TODO-LIST'}</Typography>
                <TodoCreate/>
                <TodoList/>
            </Paper>
        </Container>
    );
}

export default TodoTemplate;