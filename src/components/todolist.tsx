/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Text, Modal, Toast } from "@innovaccer/design-system";
import "@innovaccer/design-system/css";
import { MessageAppearance } from "@innovaccer/design-system/dist/core/common.type";
import { Dispatch } from "react";
import React, { useEffect, useState } from "react";
import { addItem, deleteItem } from "../redux/action";
import { IState } from "../redux/reducer";
import { IDispatch } from "../redux/action";
import { connect } from "react-redux";

interface IMapDispatchToProps {
  addTodoDispatch: (item: string) => void;
  deleteTodoDispatch: (item: string) => void;
}

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
    }

    setActionPerformed(true);
    setTimeout(() => {
      setActionPerformed(false);
    }, 500);
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

  return (
    <div>
      TodoList
      <button onClick={(e) => toggleForm(e)}> Add Item </button>
      {isFormOpen && <CaptureTodo />}
      <DisplayTodos />
      {actionPerformed && showToast()}
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
