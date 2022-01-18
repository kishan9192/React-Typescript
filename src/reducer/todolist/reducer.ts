import { reducerWithInitialState } from "typescript-fsa-reducers";
import { v4 as uuidv4 } from "uuid";

import { addItem, deleteItem, editItem } from './action';
import { ITodos } from "../../interfaces/entities/todolist";

const INITIAL_STATE: ITodos = {
    todoItems: []
}

export const todosReducer = reducerWithInitialState(INITIAL_STATE)
    .case(addItem, (state, item) => ({
        ...state,
        todoItems: [{ item, id: uuidv4() }, ...state.todoItems]
    }))
    .case(deleteItem, (state, id) => ({
        ...state,
        todoItems: state.todoItems.filter((todo) => id !== todo.id)
    }))
    .case(editItem, (state, item) => ({
        ...state,
        todoItems: state.todoItems.map((todo) => {
            if (todo.id === item.id) {
                todo.item = item.item
            }
            return todo
        })
    }))