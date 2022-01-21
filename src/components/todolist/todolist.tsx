import {
  Button,
  Text,
  Toast,
  Modal,
  Paragraph,
} from "@innovaccer/design-system";
import "@innovaccer/design-system/css";
import { useState, Dispatch, useRef } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { ThunkDispatch } from "redux-thunk";

import {
  IDispatch,
  ITodoItem,
  IProps,
  IState,
  IToast,
  itemAction,
  toastAdd,
  toastDelete,
  toastUpdate,
} from "../../interfaces/entities/todolist";
import { addItem, deleteItem, editItem } from "../../reducer/todolist/action";
import { hideToast, showToast, customThunk } from "../../reducer/toast/actions";
import "./styles.css";
import ListItem from "./ListItem";

const TodoList: React.FC<IProps> = (props) => {
  const [selectedID, setSelectedID] = useState("");
  const [modalState, setModalState] = useState({ open: false, content: "" });
  const parentRef = useRef<HTMLDivElement>(null);

  const getParentWidth = () => {
    if (parentRef.current && parentRef.current.offsetWidth) {
      return parentRef.current.offsetWidth;
    }
    return 0;
  };

  const editTodo = (todo: ITodoItem) => {
    setSelectedID(todo.id);
  };

  const renderModal = () => {
    return (
      <Modal
        open={modalState.open}
        dimension={"medium"}
        backdropClose
        onClose={() => setModalState({ ...modalState, open: false })}
        headerOptions={{
          heading: "Item Description",
        }}
      >
        <Paragraph style={{ overflowWrap: "break-word" }}>
          {modalState.content}
        </Paragraph>
      </Modal>
    );
  };

  const DisplayTodos = () => {
    return (
      <div className="mt-8" ref={parentRef}>
        {props.todoItemsState?.map((todo, index) => {
          return (
            <ListItem
              key={index}
              index={index}
              todo={todo}
              editTodo={editTodo}
              deleteItem={deleteItem}
              parentWidth={getParentWidth()}
              setModalState={setModalState}
            />
          );
        })}
      </div>
    );
  };

  const deleteItem = (id: string) => {
    props.deleteTodoDispatch(id);
    if (id === selectedID) {
      setSelectedID("");
    }
    props.customThunk(toastDelete);
  };

  const addItem = (item: string) => {
    props.addTodoDispatch(item);
    props.customThunk(toastAdd);
  };

  const renderToast = () => {
    return (
      <div className="toast">
        <div className="position-absolute" style={{ top: 400 }}>
          <Toast
            appearance={props.toastState?.appearance}
            title={props.toastState?.title}
          />
        </div>
      </div>
    );
  };

  const CaptureForm = ({ id }: { id?: string }) => {
    const TodoSchema = Yup.object().shape({
      todo: Yup.string().min(2, "Too short!").required("Required"),
    });
    let initialValue = props.todoItemsState?.find(
      (element) => element.id === id
    );
    const initialTodo = initialValue ? initialValue.item : "";
    return (
      <Formik
        initialValues={{
          todo: initialTodo,
        }}
        enableReinitialize={true}
        validationSchema={TodoSchema}
        onSubmit={(values, { resetForm }) => {
          if (id && props.editTodoDispatch) {
            props.editTodoDispatch({ id, item: values.todo });
            props.customThunk(toastUpdate);
            setSelectedID("");
          } else {
            addItem(values.todo);
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
                className="d-block mb-6"
                style={{
                  textAlign: "left",
                  fontWeight: "var(--font-weight-bold)",
                }}
              >
                {id ? "Update Task" : "Add new task"}
              </label>
              <div>
                <input
                  name="todo"
                  className="py-5 px-6"
                  placeholder="New Task"
                  type="text"
                  value={values.todo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {errors.todo && touched.todo ? (
                  <Text
                    data-testid="inputError"
                    appearance="destructive"
                    weight="medium"
                    className="d-block mt-3"
                    style={{ textAlign: "left" }}
                  >
                    {errors.todo}
                  </Text>
                ) : null}
              </div>
              <div className="d-flex flex-row justify-content-start mt-7">
                <Button
                  data-test="clearBtn"
                  appearance="alert"
                  type="button"
                  className="outline mr-3"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Clear
                </Button>
                <Button appearance="primary" type="submit">
                  {id ? "Update" : "Add"}
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
        <div className="mx-10">{<CaptureForm id={selectedID} />}</div>
        <div
          className="d-flex"
          style={{
            height: "400px",
            border: "1px solid gray",
          }}
        ></div>

        <div
          style={{
            width: "30%",
            marginLeft: 70,
          }}
        >
          {props.todoItemsState?.length > 0 ? (
            <DisplayTodos />
          ) : (
            <Text>{"Your items will appear here"}</Text>
          )}
          {modalState.open && renderModal()}
        </div>
        {props.toastState?.toastVisible && renderToast()}
      </div>
    </div>
  );
};

function mapStateToProps(state: IState) {
  return {
    todoItemsState: state?.todos?.todoItems,
    toastState: state?.toast,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<IState, unknown, itemAction>
) {
  return {
    addTodoDispatch: (payload: string) => dispatch(addItem(payload)),
    deleteTodoDispatch: (payload: string) => dispatch(deleteItem(payload)),
    editTodoDispatch: (payload: { id: string; item: string }) =>
      dispatch(editItem(payload)),
    displayToast: (payload: IToast) => dispatch(showToast(payload)),
    hideToast: (payload: boolean) => dispatch(hideToast(payload)),
    customThunk: (payload: IToast) => dispatch(customThunk(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
