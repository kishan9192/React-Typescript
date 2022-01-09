import { ADD_TODO, DELETE_TODO } from './actionTypes';
export interface IState {
    todoItems: string[]
}
type actionType = {
    type: string,
    payload: string
}
const initialState: IState = {
    todoItems: []
}
// Object.assign({}, state, {
//     todoItems: [
//         action.payload,
//         ...state.todoItems
//     ]
export function reducer(state: IState = initialState, action: actionType): IState {
    switch (action.type) {
        case ADD_TODO: return {
            todoItems: [action.payload, ...state.todoItems]
        }
        case DELETE_TODO: return {
            ...state,
            todoItems: state.todoItems.filter(item => item !== action.payload)
        };
        default: {
            return state
        }
    }
}
