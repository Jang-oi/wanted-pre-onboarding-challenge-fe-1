import React from "react";
import {Paper, Typography} from "@mui/material";

const TodoItem = ({id, title, content}) => {

    return (
        <Paper variant="outlined" sx={{p:2, marginTop: 2}}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2">{content}</Typography>
        </Paper>
    );
}

export default TodoItem;