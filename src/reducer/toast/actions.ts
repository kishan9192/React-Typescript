import actionCreatorFactory from 'typescript-fsa';
import { ThunkAction } from 'redux-thunk'

import { IToast, IState, itemAction } from "../../interfaces/entities/todolist";

const actionCreator = actionCreatorFactory('TOAST')
const showToast = actionCreator<IToast>('SHOW_TOAST')
const hideToast = actionCreator<boolean>('HIDE_TOAST')

const customThunk = (payload: IToast): ThunkAction<void, IState, unknown, itemAction> => (dispatch) => {
    dispatch(showToast(payload))
    if (payload.duration) {
        setTimeout(() => {
            dispatch(hideToast(false))
        }, payload.duration)
    }
}

export { showToast, hideToast, customThunk }