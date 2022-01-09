import { ADD_TODO, DELETE_TODO } from './actionTypes';
export interface IDispatch {
    type: string,
    payload: string
}
export function addItem(payload: string): IDispatch {
    return {
        type: ADD_TODO,
        payload
    }
}

export function deleteItem(payload: string): IDispatch {
    return {
        type: DELETE_TODO,
        payload
    }
}