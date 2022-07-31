import React, {useCallback, useEffect} from "react";
import axios from "axios";
import {axiosHeader} from "../utils/common";
import {useTodoDispatch, useTodoState} from "../context/todoContext";
import TodoItem from "./TodoItem";
import {Stack} from "@mui/material";

const TodoList = () => {

    const todoDispatch = useTodoDispatch();
    const todoState = useTodoState();

    const {todos, modal} = todoState;
    const getTodoList = useCallback(async () => {
        const response = await axios.get('/todos', axiosHeader);
        todoDispatch({
            type : 'TODO_SET',
            todos: response.data.data
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todoDispatch, modal]);

    useEffect(() => {
        getTodoList();
    }, [getTodoList]);

    return (
        <Stack spacing={2}>
            {todos.map((todo) => {
                return <TodoItem key={todo.id} title={todo.title} content={todo.content} id={todo.id}/>
            })}
        </Stack>
    );
}

export default TodoList;