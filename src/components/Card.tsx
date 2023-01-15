import { TodoType } from "../types";

interface Props {
  oneTodo: TodoType;
  setChange: (id: string, isDone?: boolean) => void;
}

export const Card = ({ oneTodo, setChange }: Props) => {
  return oneTodo.isDone !== true ? (
    <li
      key={oneTodo.id}
      className="bg-fill-yellow drop-shadow-2xl relative group py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-back-fill-hover hover:smooth-hover w-64 max-w-md h-48 md:h-64"
    >
      <h3 className="text-center font-medium">{oneTodo.text}</h3>
      <p>Creada: {oneTodo.date}</p>
      <button onClick={() => setChange(oneTodo.id, oneTodo.isDone)}>
        Marcar como {oneTodo.isDone ? "pendiente" : "completada"}
      </button>
      {oneTodo.isDone && (
        <button
          className="flex-shrink-0 bg-transparent hover:bg-back-red hover:border-back-red text-sm hover:border-4 text-text-fill hover:text-text-white py-1 px-2 rounded"
          onClick={() => setChange(oneTodo.id)}
        >
          Eliminar
        </button>
      )}
    </li>
  ) : (
    <li
      key={oneTodo.id}
      className="bg-fill-green-mid drop-shadow-2xl relative group py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-fill-green hover:smooth-hover w-64 max-w-md h-48 md:h-64"
    >
      <h3 className="text-center font-medium">{oneTodo.text}</h3>
      <p>Creada: {oneTodo.date}</p>
      <button onClick={() => setChange(oneTodo.id, oneTodo.isDone)}>
        Marcar como {oneTodo.isDone ? "pendiente" : "completada"}
      </button>
      {oneTodo.isDone && (
        <button
          className="flex-shrink-0 bg-transparent hover:bg-back-red hover:border-back-red text-sm hover:border-4 text-text-fill hover:text-text-white py-1 px-2 rounded"
          onClick={() => setChange(oneTodo.id)}
        >
          Eliminar
        </button>
      )}
    </li>
  );
};
