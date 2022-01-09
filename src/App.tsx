import "./App.css";
import Greet from "./components/greet";
import Person from "./components/person";
import PersonList from "./components/personlist";
import ChildrenProps from "./components/childrenprops";
import Button from "./components/Button";
import Input from "./components/Input";
import ContainerWithStyles from "./components/ContainerWithStyles";
import TodoList from "./components/todolist";
import { useState } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
function App() {
  const [inputValue, setInputValue] = useState("");
  const personName = {
    firstName: "Kishan",
    lastName: "Mishra",
  };
  const personList = [
    { first: "John", last: "Doe" },
    { first: "Mike", last: "Hussey" },
    { first: "Peter", last: "Parker" },
  ];
  return (
    <div className="App">
      <ChildrenProps>Welcome</ChildrenProps>
      <Greet name={"Kishan"} messageCount={20} />
      <Person name={personName} />
      <PersonList listOfPeople={personList} />
      <Button
        title={"Click"}
        handleClick={(e, id) => console.log("HandleClick", e, id)}
      />
      <Input
        value={inputValue}
        handleChange={(event) => setInputValue(event.target.value)}
      />
      {console.log(inputValue)}
      <ContainerWithStyles
        style={{
          border: 2,
          padding: 2,
          color: "red",
          backgroundColor: "yellow",
        }}
      >
        <p> This component's style and children are passed through props </p>
      </ContainerWithStyles>
      <Provider store={store}>
        <TodoList />
      </Provider>
    </div>
  );
}

export default App;
