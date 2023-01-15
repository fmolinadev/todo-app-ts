import { useEffect, useState } from "react";
import {
  getToDosFromStorage,
  setToDosInStorage,
  clearToDosFromStorage,
} from "../tools/storage";
import { TodoType } from "../types";
import img from "../assets/back_paper.png";
import Swal from "sweetalert2";
import { Card } from "./Card";
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
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Notas guardadas!",
        showConfirmButton: false,
        timer: 1500,
      });
    })();
  };

  const deleteStore = () => {
    Swal.fire({
      title: "¡Cuidado!",
      text: "¿Deseas eliminar las notas guardadas? La proxima vez que ingreses no veras el respaldo de las notas creadas y guardadas hasta el momento.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#1cacab",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, olvidar notas",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "¡Respaldo eliminado!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsDataStored(false);
        clearToDosFromStorage();
      }
    });
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
          return <Card oneTodo={oneTodo} setChange={updateOrDeleteTodo} />;
        })}
      </ul>
      <div className="px-4 py-3 text-center">
        {isDataStored ? (
          <button
            className="py-2 px-4 bg-none rounded bg-transparent hover:bg-back-red hover:border-back-red text-sm text-text-fill hover:text-text-white active:bg-none"
            onClick={deleteStore}
          >
            Olvidar lista
          </button>
        ) : (
          <button
            className="py-2 px-4 bg-none border active:bg-fill-green border-fill-green-mid border-opacity-30 rounded bg-transparent hover:bg-fill-green-mid text-sm  text-text-fill hover:text-text-white"
            onClick={storeTodosHandler}
            disabled={isDataStored}
          >
            Guardar lista
          </button>
        )}
      </div>
    </section>
  );
};
