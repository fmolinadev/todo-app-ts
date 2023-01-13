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
    <div className="flex">
      <div className="justify-center items-center mx-auto md:max-w-screen-lg 2xl:max-w-screen-xl py-7">
        <h2 className="text-2xl md:text-4xl font-extralight text-white/50 text-center py-3">
          Lista de tareas para hoy:
        </h2>
        <Form createToDo={createTodoHandler} />
        <ToDo todoData={todos} updateOrDeleteTodo={updateOrDeleteTodoHandler} />
      </div>
    </div>
  );
}

export default App;
