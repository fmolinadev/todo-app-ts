import { Form } from "./components/Form";
import { ToDo } from "./components/ToDo";
import { useTodoHook } from "./hooks/useTodoHook";

function App() {
  const [todos, dispatch] = useTodoHook();

  const createTodoHandler = (newTodoText: string): void => {
    dispatch({
      type: "add",
      payload: {
        text: newTodoText,
      },
    });
  };

  const updateOrDeleteTodoHandler = (id: string, isDone?: boolean): void => {
    if (isDone !== undefined) {
      return dispatch({
        type: "update",
        payload: { id },
      });
    }
    dispatch({
      type: "delete",
      payload: { id },
    });
  };
  return (
    <div className="App">
      <h2>Lista de tareas:</h2>
      <Form createToDo={createTodoHandler} />
      <ToDo todoData={todos} updateOrDeleteTodo={updateOrDeleteTodoHandler} />
    </div>
  );
}

export default App;
