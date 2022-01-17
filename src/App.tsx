import "./App.css";
import TodoList from "./components/todolist/todolist";
import store from "./reducer/store";
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
