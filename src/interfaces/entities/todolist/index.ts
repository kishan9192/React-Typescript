import { ToastProps } from "@innovaccer/design-system"
export interface IMapDispatchToProps {
    addTodoDispatch: (item: string) => void;
    deleteTodoDispatch: (item: string) => void;
    editTodoDispatch?: (payload: { id: string; item: string }) => void;
}

export interface ITodoItem {
    item: string;
    id: string;
};

export interface IMapStateToProps {
    todoItemsState: ITodoItem[];
}

type ToastAppearance = ToastProps["appearance"];
export interface IProps {
    todoItemsState: ITodoItem[];
    addTodoDispatch: (item: string) => void;
    deleteTodoDispatch: (item: string) => void;
    editTodoDispatch: (payload: { id: string; item: string }) => void;
    toastState: IToast
    displayToast: (payload: IToast) => void
    hideToast: (payload: boolean) => void
    customThunk: (payload: IToast) => void
}

export interface ITodos {
    todoItems: ITodoItem[]
}

export interface IToast {
    toastVisible: boolean
    title: string,
    appearance: ToastAppearance,
    duration: number
}
export interface IState {
    todos: ITodos,
    toast: IToast
}

export interface IDispatch {
    type: string,
    payload: string | ITodoItem | IToast | boolean
}
export type itemAction = {
    type: string
}

export const toastAdd: IToast = {
    appearance: "success",
    title: "Item Added!",
    duration: 2000,
    toastVisible: true,
}

export const toastDelete: IToast = {
    appearance: "alert",
    title: "Item Deleted!",
    duration: 2000,
    toastVisible: true,
}

export const toastUpdate: IToast = {
    appearance: "success",
    title: "Item Updated!",
    duration: 2000,
    toastVisible: true,
}