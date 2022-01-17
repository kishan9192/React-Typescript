import { ToastProps } from "@innovaccer/design-system"
export interface IMapDispatchToProps {
    addTodoDispatch: (item: string) => void;
    deleteTodoDispatch: (item: string) => void;
    editTodoDispatch?: (payload: { id: string; item: string }) => void;
}

export interface ItemType {
    item: string;
    id: string;
};

export interface IMapStateToProps {
    todoItemsState: ItemType[];
}

type ToastAppearance = ToastProps["appearance"];
export interface IProps {
    todoItemsState: ItemType[];
    addTodoDispatch: (item: string) => void;
    deleteTodoDispatch: (item: string) => void;
    editTodoDispatch: (payload: { id: string; item: string }) => void;
    toastState: IToastState
    displayToast: (payload: IToastState) => void
    hideToast: (payload: boolean) => void
}

export interface ITodosState {
    todoItems: ItemType[]
}

export interface IToastState {
    toastVisible: boolean
    title: string,
    appearance: ToastAppearance,
    duration: number
}
export interface IState {
    todos: ITodosState,
    toast: IToastState
}

export interface IDispatch {
    type: string,
    payload: string | ItemType | IToastState | boolean
}