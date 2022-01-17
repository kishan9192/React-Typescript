import { reducerWithInitialState } from "typescript-fsa-reducers";

import { showToast, hideToast } from "./actions";

const INITIAL_STATE = {
    toastVisible: false,
    title: "",
    appearance: "",
    duration: 0
}

export const toastReducer = reducerWithInitialState(INITIAL_STATE).case(showToast, (state, payload) => ({
    ...state,
    toastVisible: true,
    title: payload.title,
    appearance: payload.appearance,
    duration: payload.duration
})).case(hideToast, (state, payload) => ({
    ...state,
    toastVisible: payload
}))