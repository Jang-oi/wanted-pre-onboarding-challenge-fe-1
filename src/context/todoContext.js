import {createContext, useReducer, useContext} from "react";

const initialTodos = [];

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'TODO_SET' :
            return action.todos;
        case 'TODO_CREATE' :
            return state.concat(action.todo);
        case 'TODO_REMOVE' :
            return state.filter(todo => todo.id !== action.id);
        default :
            throw new Error(`Unhandled action type : ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

export const TodoProvider = ({children}) => {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export const useTodoState = () => {
    const context = useContext(TodoStateContext);
    if (!context) throw new Error('Cannot find TodoProvider');
    return context
}

export const useTodoDispatch = () => {
    const context = useContext(TodoDispatchContext);
    if (!context) throw new Error('Cannot find TodoProvider');
    return context
}