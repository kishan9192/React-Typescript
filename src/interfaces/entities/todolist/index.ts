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

export interface PropType {
    todoItemsState?: ItemType[];
    addTodoDispatch?: (item: string) => void;
    deleteTodoDispatch?: (item: string) => void;
    editTodoDispatch?: (payload: { id: string; item: string }) => void;
}

export interface IState {
    todoItems: ItemType[]
}

export interface IDispatch {
    type: string,
    payload: string | { item: string, id: string }
}