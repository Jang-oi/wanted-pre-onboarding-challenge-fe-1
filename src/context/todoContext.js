import {createContext, useReducer, useContext} from "react";

const initialTodos = {
    todos: [],
    modal: {
        open: false,
        id  : '',
    },
};

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'TODO_SET' :
            return {
                ...state,
                todos: action.todos
            };
        case 'TODO_CREATE' :
            return {
                ...state,
                todos: state.todos.concat(action.todo)
            };
        case 'TODO_REMOVE' :
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            };
        case 'TODO_DETAIL' :
            return {
                ...state,
                modal: {
                    open: action.open,
                    id  : action.id
                }
            }
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