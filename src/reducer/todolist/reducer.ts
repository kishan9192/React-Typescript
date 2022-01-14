import { addItem, deleteItem, editItem } from './action';
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { v4 as uuidv4 } from "uuid";
import { IState } from "../../interfaces/entities/todolist";

const INITIAL_STATE: IState = {
    todoItems: []
}

export const reducer = reducerWithInitialState(INITIAL_STATE)
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

// export function reducer(state: IState = initialState, action: actionType): IState {
//     switch (action.type) {
//         case ADD_TODO: return {
//             todoItems: [action.payload, ...state.todoItems]
//         }
//         case DELETE_TODO: return {
//             ...state,
//             todoItems: state.todoItems.filter(item => item !== action.payload)
//         };
//         default: {
//             return state
//         }
//     }
// }
