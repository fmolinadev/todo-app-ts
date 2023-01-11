import { useEffect, useState } from "react";
import { getToDosFromStorage, setToDosInStorage } from "../tools/storage";
import { TodoType } from "../types";

interface Props {
  todoData: Array<TodoType>;
  updateOrDeleteTodo: (id: string, isDone?: boolean) => void;
}

export const ToDo = ({ todoData, updateOrDeleteTodo }: Props) => {
  const [isDataStored, setIsDataStored] = useState(false);

  useEffect(() => {
    const storedData = getToDosFromStorage<TodoType[]>();
    if (storedData.length === todoData.length) {
      return setIsDataStored(true);
    }
    setIsDataStored(false);
  }, [todoData]);

  const storeTodosHandler = (): void => {
    (async () => {
      const isDataStored = await setToDosInStorage(todoData);
      setIsDataStored(isDataStored);
    })();
  };

  if (todoData.length === 0) {
    return <h2>Aún no hay notas creadas.</h2>;
  }

  return (
    <>
      <ul>
        {todoData.map((oneTodo) => {
          return (
            <li key={oneTodo.id}>
              <h3>{oneTodo.text}</h3>
              <p>{oneTodo.date}</p>
              <button
                onClick={() => updateOrDeleteTodo(oneTodo.id, oneTodo.isDone)}
              >
                Marcar como {oneTodo.isDone ? "pendiente" : "completada"}
              </button>
              {oneTodo.isDone && (
                <button onClick={() => updateOrDeleteTodo(oneTodo.id)}>
                  Eliminar
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <hr />
      <button onClick={storeTodosHandler} disabled={isDataStored}>
        Guardar lista
      </button>
    </>
  );
};
