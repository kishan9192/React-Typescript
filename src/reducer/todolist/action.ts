import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('TODO_LIST')

const addItem = actionCreator<string>('ADD_ITEM');
const deleteItem = actionCreator<string>('DELETE_ITEM');
const editItem = actionCreator<{ id: string, item: string }>('EDIT_ITEM')

export { addItem, deleteItem, editItem }