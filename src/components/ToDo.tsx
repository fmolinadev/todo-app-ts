import { useEffect, useState } from "react";
import {
  getToDosFromStorage,
  setToDosInStorage,
  clearToDosFromStorage,
} from "../tools/storage";
import { TodoType } from "../types";
import img from "../assets/back_paper.png";

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
    return (
      <div className="h-96 min-h-full flex justify-center items-center mx-auto md:max-w-screen-lg 2xl:max-w-screen-xl">
        <h2 className="text-2xl md:text-4xl font-extralight text-white/50 text-center aligne-middle">
          Aún no hay notas creadas.
        </h2>
      </div>
    );
  }

  return (
    <section className="align-middle">
      <ul
        style={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "repeat",
        }}
        className="mb-10 md:max-w-screen-lg 2xl:max-w-screen-xl sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 lg:p-10 rounded-3xl"
      >
        {todoData.map((oneTodo) => {
          return oneTodo.isDone !== true ? (
            <li
              key={oneTodo.id}
              className="bg-fill-yellow drop-shadow-2xl relative group py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-back-fill-hover hover:smooth-hover max-w-md"
            >
              <h3 className="max-w-md text-center font-medium">
                {oneTodo.text}
              </h3>
              <p>Creada: {oneTodo.date}</p>
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
          ) : (
            <li
              key={oneTodo.id}
              className="bg-fill-green-mid drop-shadow-2xl relative group py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-fill-green hover:smooth-hover"
            >
              <h3 className="max-w-md text-center font-medium">
                {oneTodo.text}
              </h3>
              <p>Creada: {oneTodo.date}</p>
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
