import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoList from "./todolist";
import ListItem from "./ListItem";
import { ITodoItem } from "../../interfaces/entities/todolist";
import { addItem, deleteItem } from "../../reducer/todolist/action";
// import store from "../../reducer/store";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { fireEvent, waitFor, render, act } from "@testing-library/react";
import App from "../../App";
configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Todolist tests", () => {
  let initialState = {};
  const store = mockStore(initialState);
  store.dispatch = jest.fn();
  const { container, getByTestId } = render(<App />);
  let formInput = container.querySelector('input[name="todo"]');
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  it("Should render the form input without errors", () => {
    expect(wrapper.find("input").length).toBe(1);
  });

  it("Fill the form input and check its value", async () => {
    await waitFor(() => {
      if (formInput) {
        fireEvent.change(formInput, {
          target: {
            value: "React-Native",
          },
        });
      }
    });

    // formInput.simulate("change", {
    //   target: {
    //     name: "todo",
    //     value: "React-Native",
    //   },
    // });
    // setTimeout(() => {
    //   wrapper.update();
    // }, 0);

    expect(formInput).toHaveValue("React-Native");
  });

  it("Should have the clear button disabled by default", () => {
    expect(
      wrapper.find({ "data-test": "clearBtn" }).first().prop("disabled")
    ).toBeTruthy();
  });

  it("Fill the form input and reset the value on click of reset button", async () => {
    const wrapper2 = mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    const inputEl = wrapper2.find('input[name="todo"]');

    const text = "React-native";

    act(() => {
      inputEl.simulate("change", {
        target: {
          name: text,
        },
      });
    });

    wrapper2.debug();
    // await waitFor(() => {
    //   if (formInput) {
    //     fireEvent.change(formInput, {
    //       target: {
    //         value: "React",
    //       },
    //     });
    //     // expect(formInput).toHaveValue("React");
    //     wrapper.find({ "data-test": "clearBtn" }).first().props().onClick();
    //     wrapper.update();
    //     expect(wrapper.find("input[name='todo']").text()).toHaveValue("");
    //   }
    // });
  });

  it("Testing list item", () => {
    const listProps = {
      index: 1,
      todo: {
        id: "ab123",
        item: "I have written a new task to check if the text will overflow and modal will open or not asafsfasfasfasfasfasffasfasfasf",
      },
      editTodo: jest.fn(),
      deleteItem: jest.fn(),
      parentWidth: 10,
      setModalState: jest.fn(),
      shouldModalRender: jest.fn(),
    };
    // const itemWrapper = shallow(<ListItem {...listProps} />);
    wrapper.find({ "data-test": "list-item" }).simulate("click");
    expect(wrapper.find("Modal")).toHaveLength(1);
  });
});

//   it("Validate the form submission", async () => {
//     if (formInput) {
//       fireEvent.blur(formInput);
//     }
//     await waitFor(() => {
//       expect(getByTestId("inputError")).not.toBe(null);
//       expect(getByTestId("inputError")).toHaveTextContent("Required");
//     });
//   });
