/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import TodoList from "./components/todolist/todolist";
import { useState } from "react";
import store from "./reducer/todolist/store";
import { Provider } from "react-redux";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TodoList />
      </Provider>
    </div>
  );
}

export default App;
