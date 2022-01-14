/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Text, Modal, Toast, Icon } from "@innovaccer/design-system";
import "@innovaccer/design-system/css";
import { MessageAppearance } from "@innovaccer/design-system/dist/core/common.type";
import { Dispatch } from "react";
import React, { useEffect, useState } from "react";
import { addItem, deleteItem, editItem } from "../../reducer/todolist/action";
import {
  IDispatch,
  IMapDispatchToProps,
  ItemType,
  IMapStateToProps,
  PropType,
  IState,
} from "../../interfaces/entities/todolist";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import "./styles.css";

const TodoList = (props: PropType) => {
  const [todoItems, setTodoItems] = useState<Array<ItemType>>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [toastType, setToastType] = useState<MessageAppearance>();
  const [actionPerformed, setActionPerformed] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    updatedValue: "",
    oldValue: "",
    id: "",
  });

  useEffect(() => {
    if (props.todoItemsState) setTodoItems(props.todoItemsState);
  }, [props.todoItemsState]);

  const CaptureTodo = () => {
    const [todoValue, setTodoValue] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoValue(e.target.value);
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

  const editTodo = (todo: ItemType) => {
    setSelectedItem({ ...selectedItem, oldValue: todo.item, id: todo.id });
  };

  const DisplayTodos = () => {
    return (
      <div className="mt-8">
        {todoItems.map((todo, index) => {
          return (
            <div
              style={{ borderRadius: 10 }}
              className="bg-primary py-3 mb-5 d-flex flex-row align-items-center"
              key={index}
            >
              <div
                style={{
                  display: "block",
                  paddingLeft: 20,
                  marginRight: 10,
                  width: "60%",
                }}
              >
                <Text
                  // className="flex-wrap"
                  weight="strong"
                  size="regular"
                  appearance="white"
                >
                  {todo.item}
                </Text>
              </div>

              <Icon
                className="ml-8 cursor-pointer"
                name="edit"
                size={20}
                appearance="accent1_lighter"
                onClick={() => editTodo(todo)}
              />
              <Button
                className="ml-auto mr-8"
                onClick={() => deleteItem(todo.id)}
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

  const deleteItem = (id: string) => {
    setToastType("alert");
    if (props.deleteTodoDispatch && props.todoItemsState) {
      props.deleteTodoDispatch(id);
    }
    if (id === selectedItem.id) {
      setSelectedItem({ oldValue: "", updatedValue: "", id: "" });
    }
    setActionPerformed(true);
    setTimeout(() => {
      setActionPerformed(false);
    }, 1200);
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
    }, 1200);
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
    return (
      <div className="toast">
        <Toast appearance={toastType} title={title} />
      </div>
    );
  };

  const captureForm = () => {
    return (
      <Formik
        initialValues={{
          todo: selectedItem.oldValue ? selectedItem.oldValue : "",
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          if (selectedItem.id && props.editTodoDispatch) {
            props.editTodoDispatch({ id: selectedItem.id, item: values.todo });
            setSelectedItem({ oldValue: "", updatedValue: "", id: "" });
          } else {
            addTodo(values.todo);
          }
          resetForm();
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="todo"
                style={{
                  textAlign: "left",
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Add a task
              </label>
              <div>
                <input
                  id="todo"
                  className="py-5 px-6"
                  placeholder="New Task"
                  type="text"
                  value={values.todo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="d-flex flex-row justify-content-start mt-7">
                <Button
                  appearance="alert"
                  type="button"
                  className="outline mr-6"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Clear
                </Button>
                <Button appearance="primary" type="submit">
                  {selectedItem.id ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div className="mt-10">
      <h1>Todo List</h1>
      <div className="d-flex align-items-start flex-row mt-8 pb-4 ">
        <div className="mx-10">{captureForm()}</div>
        <div
          style={{
            display: "flex",
            height: "400px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "gray",
          }}
        ></div>

        <div
          style={{
            width: "30%",
            overflowWrap: "break-word",
            marginLeft: 70,
          }}
        >
          <DisplayTodos />
        </div>
        {actionPerformed && showToast()}
      </div>
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
    editTodoDispatch: (payload: { id: string; item: string }) =>
      dispatch(editItem(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
