import actionCreatorFactory from 'typescript-fsa';

import { IToastState } from "../../interfaces/entities/todolist";

const actionCreator = actionCreatorFactory('TOAST')
const showToast = actionCreator<IToastState>('SHOW_TOAST')
const hideToast = actionCreator<boolean>('HIDE_TOAST')
export { showToast, hideToast }