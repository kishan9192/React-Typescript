import {
  Button,
  Text,
  Toast,
  Icon,
  Modal,
  Paragraph,
} from "@innovaccer/design-system";
import "@innovaccer/design-system/css";
import { useState, Dispatch } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  IDispatch,
  ItemType,
  IProps,
  IState,
  IToastState,
} from "../../interfaces/entities/todolist";
import { addItem, deleteItem, editItem } from "../../reducer/todolist/action";
import { hideToast, showToast } from "../../reducer/toast/actions";
import "./styles.css";

const TodoList: React.FC<IProps> = (props) => {
  const [selectedID, setSelectedID] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const editTodo = (todo: ItemType) => {
    setSelectedID(todo.id);
  };

  const renderModal = () => {
    return (
      <Modal
        open={modalOpen}
        dimension={"medium"}
        backdropClose
        onClose={() => setModalOpen(false)}
        headerOptions={{
          heading: "Item Description",
        }}
      >
        <Paragraph>{modalContent}</Paragraph>
      </Modal>
    );
  };

  const modalHelper = (htmlElementID: string) => {
    const element = document.getElementById(htmlElementID);
    if (element && element.offsetWidth < element.scrollWidth) {
      setModalOpen(true);
      setModalContent(element?.innerText);
    }
  };

  const DisplayTodos = () => {
    return (
      <div className="mt-8">
        {props.todoItemsState.map((todo, index) => {
          return (
            <div
              style={{ borderRadius: 10, textAlign: "left" }}
              className="bg-primary py-3 mb-5 d-flex flex-row align-items-center"
              key={index}
            >
              <div
                id={index.toString()}
                onClick={() => modalHelper(index.toString())}
                className="ellipsis--noWrap w-75 mr-6 pl-6"
                style={{
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--text-white)",
                  fontSize: "var(--font-size-m)",
                }}
              >
                <Text weight="strong" size="regular" appearance="white">
                  {todo.item}
                </Text>
              </div>

              <Icon
                className="mr-5 cursor-pointer"
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
    props.deleteTodoDispatch(id);
    if (id === selectedID) {
      setSelectedID("");
    }
    props.displayToast({
      appearance: "alert",
      title: "Item Deleted",
      duration: 2000,
      toastVisible: true,
    });
    setTimeout(() => {
      props.hideToast(false);
    }, 2000);
  };

  const addTodo = (item: string) => {
    props.addTodoDispatch(item);
    props.displayToast({
      appearance: "success",
      title: "Item Added",
      duration: 2000,
      toastVisible: true,
    });
    setTimeout(() => {
      props.hideToast(false);
    }, 2000);
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
    let initialValue = props.todoItemsState.find(
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
            setSelectedID("");
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
                  id="todo"
                  className="py-5 px-6"
                  placeholder="New Task"
                  type="text"
                  value={values.todo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.todo && touched.todo ? (
                  <Text
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
          {props.todoItemsState.length > 0 ? (
            <DisplayTodos />
          ) : (
            <Text>{"Your items will appear here"}</Text>
          )}
          {modalOpen && renderModal()}
        </div>
        {props.toastState.toastVisible && renderToast()}
      </div>
    </div>
  );
};

function mapStateToProps(state: IState) {
  return {
    todoItemsState: state.todos.todoItems,
    toastState: state.toast,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatch>) {
  return {
    addTodoDispatch: (payload: string) => dispatch(addItem(payload)),
    deleteTodoDispatch: (payload: string) => dispatch(deleteItem(payload)),
    editTodoDispatch: (payload: { id: string; item: string }) =>
      dispatch(editItem(payload)),
    displayToast: (payload: IToastState) => dispatch(showToast(payload)),
    hideToast: (payload: boolean) => dispatch(hideToast(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
