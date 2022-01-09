/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Text, Modal, Toast } from "@innovaccer/design-system";
import "@innovaccer/design-system/css";
import { MessageAppearance } from "@innovaccer/design-system/dist/core/common.type";
import { Dispatch } from "react";

/**
 * loading: false
 * data
 * error: undefined
 *
 * 16.8 => batching updates not reliable
 *
 * setLoading(true)
 * setError(false);
 *
 * const [loading] = React.useState()
 * const [error] = React.useState()
 *
 *
 * const reducer = (state, action): state => {
 *  switch (action.type) {
 *      case 'ADD_TODO_API_STARTED':
 *          return {
 *              ...state,
 *              loading: true,
 *              error: null
 *          }
 *  }
 * }
 *
 * const [state, dispatch] = React.useReducer<{
 *  loading: boolean;
 *  error: string | null;
 * }>(reducer, {
 *  loading: false,
 *  error: null,
 * })
 *
 *
 * const [state, setState] = React.useState({
 *  loading: false,
 *  error: null,
 *  data: {
 *    todos: []
 *  }
 * });
 *
 * const onTodoAdd = (text: string) => {
 *  setState(prevState => ({
 *      ...prevState,
 *      loading: true,
 *      error: null,
 *     data: {
 *          ...prevState.data,
 *          todos: []
 *      }
 *  }))
 *
 *  this.setState({ loading: true, error: null });
 *
 *  // immerjs
 *  import produce from 'immer';
 *
 * setState(prevState =>
 *   produce(prevState, draft => {
 *      draft.loading = true;
 *      draft.error = null;
 *      draft.todos = [];
 *   })
 * )
 *
 * // lodash
 *
 * import get from 'lodash-es/get';
 * get(obj, 'a.b.c', 'default');
 *
 *
 */
import React, { useEffect, useState } from "react";
import { addItem, deleteItem } from "../redux/action";
import { IState } from "../redux/reducer";
import { IDispatch } from "../redux/action";
import { connect } from "react-redux";

interface IMapDispatchToProps {
  addTodoDispatch: (item: string) => void;
  deleteTodoDispatch: (item: string) => void;
}

type DispatchType = {
  (): (e: string) => void;
};

interface IMapStateToProps {
  todoItemsState: string[];
}

type PropType = {
  todoItemsState?: string[];
  addTodoDispatch?: (item: string) => void;
  deleteTodoDispatch?: (item: string) => void;
};

const TodoList = (props: PropType) => {
  const [todoItems, setTodoItems] = useState<Array<string>>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [toastType, setToastType] = useState<MessageAppearance>();
  const [actionPerformed, setActionPerformed] = useState(false);

  useEffect(() => {
    if (props.todoItemsState) setTodoItems(props.todoItemsState);
  }, [props.todoItemsState]);

  const CaptureTodo = () => {
    const [todoValue, setTodoValue] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoValue(e.target.value);
    };

    const addTodo = (item: string) => {
      if (props.addTodoDispatch && props.todoItemsState) {
        props.addTodoDispatch(item);
        console.log(props.todoItemsState);
      }
      setToastType("success");
      setIsFormOpen(!isFormOpen);
      setActionPerformed(true);
      setTimeout(() => {
        setActionPerformed(false);
      }, 500);
    };

    return (
      <Modal
        open={isFormOpen}
        dimension="small"
        backdropClose={true}
        onClose={() => setIsFormOpen(!isFormOpen)}
        headerOptions={{
          heading: "Add Item",
        }}
        footer={
          <>
            <Button
              className="mr-4"
              appearance="alert"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              Cancel
            </Button>
            <Button appearance="primary" onClick={() => addTodo(todoValue)}>
              Submit
            </Button>
          </>
        }
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" value={todoValue} onChange={handleChange} />
        </form>
      </Modal>
    );
  };

  const DisplayTodos = () => {
    return (
      <div className="w-25 mx-auto mt-8">
        {todoItems.map((item, index) => {
          return (
            <div
              style={{ borderRadius: 10 }}
              className="bg-primary py-3 mb-5 d-flex flex-row align-items-center"
              key={index}
            >
              <Text
                className="ml-8"
                weight="strong"
                size="regular"
                appearance="white"
              >
                {item}
              </Text>
              <Button
                className="ml-auto mr-8"
                onClick={() => deleteItem(item)}
                aria-label="Delete"
                icon="delete"
                size="tiny"
              />
            </div>
          );
        })}
      </div>
    );
  };

  const deleteItem = (item: string) => {
    setToastType("alert");
    if (props.deleteTodoDispatch && props.todoItemsState) {
      props.deleteTodoDispatch(item);
      console.log(props.todoItemsState);
    }

    setActionPerformed(true);
    setTimeout(() => {
      setActionPerformed(false);
    }, 500);
    // setTodoItems(todoItems.filter((listItem) => listItem !== item));
  };

  const toggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsFormOpen(!isFormOpen);
  };

  const showToast = () => {
    let title: string;
    if (toastType === "alert") {
      title = "Item Deleted!";
    } else {
      title = "Item Added!";
    }
    return <Toast appearance={toastType} title={title} />;
  };

  // function closeToast () {
  //     let x = document.querySelector<HTMLDivElement>('.toastMessage')
  //     x.style.display = "none";
  //     console.log(typeof(x));
  // }

  return (
    <div>
      TodoList
      <button onClick={(e) => toggleForm(e)}> Add Item </button>
      {isFormOpen && <CaptureTodo />}
      <DisplayTodos />
      {/* <div className = "toastMessage">
                <Toast onClose={closeToast} appearance="alert" title="Item Deleted!" />
            </div> */}
      {actionPerformed && showToast()}
      <p
        style={{
          color: "var(--text-destructive)",
          fontWeight: "var(--font-weight-bold)",
        }}
      >
        Some text in a paragraph
      </p>
    </div>
  );
};

function mapStateToProps(state: IState): IMapStateToProps {
  return {
    todoItemsState: state.todoItems,
  };
}

// need to import Dispatch from react, then pass the action type in Dispatch as type parameter
function mapDispatchToProps(
  dispatch: Dispatch<IDispatch>
): IMapDispatchToProps {
  return {
    addTodoDispatch: (payload: string) => dispatch(addItem(payload)),
    deleteTodoDispatch: (payload: string) => dispatch(deleteItem(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
