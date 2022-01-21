import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { deleteItem } from "reducer/todolist/action";
import ListItem from "./todolist/ListItem";
import TodoList from "./todolist/todolist";
import React, { useRef, useState } from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
configure({ adapter: new Adapter() });

describe("Testing List Item", () => {
  let wrapper: any;
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
  beforeEach(() => {
    wrapper = mount(<ListItem {...listProps} />);
  });

  it("List Item component", () => {
    expect(wrapper.find({ "data-test": "list-item" }).exists()).toBe(true);
  });

  it("Delete Item", () => {
    wrapper.find("#deleteBtn").first().simulate("click");
    expect(listProps.deleteItem).toHaveBeenCalledWith("ab123");
  });

  it("Edit Item", () => {
    wrapper.find({ "data-test": "editBtn" }).first().simulate("click");
    expect(listProps.editTodo).toHaveBeenCalledWith(listProps.todo);
  });

  it("Click on the item to check if modal will render", () => {
    const propsWrapper = wrapper.find({ "data-test": "list-item" }).props();
    // console.log("Props", propsWrapper);
    // expect(wrapper.find("Text").first().html()).toEqual(listProps.todo.item);
    // expect(wrapper.find("#refValue").first().text()).toEqual(300);
    expect(wrapper.find("#modalVal").html()).toEqual("true");
    // const shouldModalRender = jest.spyOn(
    //   ListItem.prototype,
    //   "shouldModalRender"
    // );
    // expect(listProps.setModalState).toHaveBeenCalled();
  });
});
