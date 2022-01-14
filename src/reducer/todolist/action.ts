/* eslint-disable @typescript-eslint/no-unused-vars */
import actionCreatorFactory from 'typescript-fsa';
import { IDispatch } from '../../interfaces/entities/todolist';
const actionCreator = actionCreatorFactory('TODO_LIST')

const addItem = actionCreator<string>('ADD_ITEM');
const deleteItem = actionCreator<string>('DELETE_ITEM');
const editItem = actionCreator<{ id: string, item: string }>('EDIT_ITEM');

// export function addItem(payload: string): IDispatch {
//     return {
//         type: ADD_TODO,
//         payload
//     }
// }

// export function deleteItem(payload: string): IDispatch {
//     return {
//         type: DELETE_TODO,
//         payload
//     }
// }
export { addItem, deleteItem, editItem }