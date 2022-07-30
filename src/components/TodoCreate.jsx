import React, {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import axios from "axios";
import {axiosHeader} from "../utils/common";
import {useTodoDispatch} from "../context/todoContext";

const TodoCreate = () => {

    const [todoInputs, setTodoInputs] = useState({
        title  : '',
        content: '',
    });

    const {title, content} = todoInputs;

    const todoDispatch = useTodoDispatch();

    /**
     * ADD 버튼 클릭시 진행하는 함수
     */
    const onTodoAdd = async () => {
        try {
            const response = await axios.post('/todos', todoInputs, axiosHeader);
            todoDispatch({
                type: 'TODO_CREATE',
                todo: response.data.data
            });
        } catch (e) {
            const errorMsg = e.response.data.details;
            alert(errorMsg);
        }
    }

    /**
     * Input 에 입력 시 진행하는 함수
     * @param e
     */
    const onTodoChange = (e) => {
        const {name, value} = e.target;
        setTodoInputs({
            ...todoInputs,
            [name]: value
        })
    }

    return (
        <Stack direction="row" spacing={3}>
            <TextField id="standard-basic" label="TITLE" variant="standard" style={{width: '100%'}}
                       onChange={onTodoChange} name="title" value={title}/>
            <TextField id="standard-basic" label="CONTENT" variant="standard" style={{width: '100%'}}
                       onChange={onTodoChange} name="content" value={content}/>
            <Button variant="contained" endIcon={<AddIcon/>} onClick={onTodoAdd} style={{width: '20%'}}>ADD</Button>
        </Stack>
    );
}

export default TodoCreate;