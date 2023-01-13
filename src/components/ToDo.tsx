import { useEffect, useState } from "react";
import {
  getToDosFromStorage,
  setToDosInStorage,
  clearToDosFromStorage,
} from "../tools/storage";
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

  const deleteStore = () => {
    setIsDataStored(false);
    clearToDosFromStorage();
  };

  if (todoData.length === 0) {
    return <h2>Aún no hay notas creadas.</h2>;
  }

  return (
    <section>
      <ul className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {todoData.map((oneTodo) => {
          return (
            <li
              key={oneTodo.id}
              className="bg-fill-yellow relative group py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-back-fill-hover hover:smooth-hover"
            >
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
      <div className="px-4 py-3 text-center">
        <button
          className="py-2 px-4 bg-none mr-2"
          onClick={storeTodosHandler}
          disabled={isDataStored}
        >
          Guardar lista
        </button>
        {isDataStored ? (
          <button
            className="py-2 px-4 bg-none rounded  mr-2"
            onClick={deleteStore}
          >
            Olvidar listas
          </button>
        ) : null}
      </div>
    </section>
  );
};
