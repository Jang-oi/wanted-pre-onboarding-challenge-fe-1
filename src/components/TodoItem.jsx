import React from "react";
import {Paper, Typography} from "@mui/material";
import {useTodoDispatch} from "../context/todoContext";

const TodoItem = ({id, title, content}) => {

    const todoDispatch = useTodoDispatch();

    /**
     * 해당 Item 클릭 시 자세히 보기 모달창을 띄우기 위한 함수
     */
    const onTodoClick = () => {
        todoDispatch({
            type: 'TODO_DETAIL',
            open: true,
            id
        });
    };

    return (
        <Paper variant="outlined" sx={{p: 2, marginTop: 2}}>
            <Typography variant="h5" style={{cursor: 'pointer', width: 'fit-content'}}
                        onClick={onTodoClick}>{title}</Typography>
            <Typography variant="body2">{content}</Typography>
        </Paper>
    );
}

export default TodoItem;