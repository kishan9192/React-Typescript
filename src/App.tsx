import "./App.css";
import TodoList from "./components/todolist/todolist";
import store from "./reducer/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
