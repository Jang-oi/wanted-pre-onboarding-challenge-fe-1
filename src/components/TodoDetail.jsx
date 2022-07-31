import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useTodoDispatch, useTodoState} from "../context/todoContext";
import axios from "axios";
import {axiosHeader} from "../utils/common";

const TodoDetail = () => {

    const style = {
        position : 'absolute',
        top      : '50%',
        left     : '50%',
        transform: 'translate(-50%, -50%)',
        width    : 400,
        bgcolor  : 'white',
        border   : '2px solid #000',
        boxShadow: 24,
        p        : 4,
        minHeight: 400
    };

    const todoState = useTodoState();
    const todoDispatch = useTodoDispatch();

    const {open, id} = todoState.modal;

    const [todo, setTodo] = useState({
        title    : '',
        content  : '',
        createdAt: '',
    });

    const {title, content, createdAt} = todo;

    /**
     * 서버에서 받은 날짜를 문자열로 바꿔주는 함수
     * @param date
     * @returns {string}
     */
    const getDateString = (date) => {
        const today = new Date(date);
        return today.toLocaleString('ko-KR', {
            year   : 'numeric',
            month  : 'long',
            day    : 'numeric',
            weekday: 'long',
            hour   : '2-digit',
            minute : '2-digit'
        });
    }
    /**
     * 모달 창 닫을 때 진행되는 함수
     */
    const todoModalClose = () => {
        todoDispatch({
            type: 'TODO_DETAIL',
            open: false,
            id  : '',
        });
    };

    /**
     * input 수정 시 진행되는 함수
     * @param e
     */
    const onTodoInputChange = (e) => {
        const {name, value} = e.target;
        setTodo({
            ...todo,
            [name]: value,
        });
    };

    /**
     * 수정, 삭제 버튼 클릭 시 진행되는 함수
     * 서버 호출하여 수정한 뒤 모달 창 닫으면서 state 수정하여 리렌더링 되게함.
     * @returns {Promise<void>}
     */
    const onEdit = async (e) => {
        const {name} = e.target;
        try {
            if (name === 'edit') await axios.put(`/todos/${id}`, {title, content}, axiosHeader);
            if (name === 'delete') await axios.delete(`/todos/${id}`, axiosHeader);
            todoDispatch({
                type: 'TODO_DETAIL',
                open: false,
                id  : '',
            });
        } catch (e) {
            const errorMsg = e.response.data.details;
            alert(errorMsg);
        }
    }

    /**
     * 해당 Item 의 Id 값을 가지고 상세 내역 조회하는 함수
     * @type {(function(): Promise<void>)|*}
     */
    const getTodoDetail = useCallback(async () => {
        if (!id) return;
        try {
            const response = await axios.get(`/todos/${id}`, axiosHeader);
            setTodo(response.data.data);
        } catch (e) {
            const errorMsg = e.response.data.details;
            alert(errorMsg);
        }
    }, [id]);

    useEffect(() => {
        getTodoDetail();
    }, [getTodoDetail]);


    return (
        <Modal open={open} onClose={todoModalClose}>
            <Box sx={style}>
                <TextField id="standard-basic" variant="standard" style={{width: '100%'}} name="title"
                           value={title} inputProps={{style: {minHeight: '40px', fontSize: 30}}}
                           onChange={onTodoInputChange}
                />
                <TextField id="standard-basic" variant="standard" style={{width: '100%'}} name="content"
                           value={content} multiline={true}
                           inputProps={{style: {minHeight: '300px', fontSize: 15}}}
                           onChange={onTodoInputChange}
                />
                <Typography variant="body2">{getDateString(createdAt)}</Typography>
                <div style={{float: 'right'}}>
                    <Button name={'edit'} onClick={onEdit}>수정</Button>
                    <Button name={'delete'} onClick={onEdit}>삭제</Button>
                </div>
            </Box>
        </Modal>
    );
}

export default TodoDetail;