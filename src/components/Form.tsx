import React, { useState } from "react";

interface Props {
  createToDo: (text: string) => void;
}

export const Form = ({ createToDo }: Props) => {
  const [todoText, setTodoText] = useState<string>("");

  const changeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    setTodoText(e.currentTarget.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (todoText === "") return;
    createToDo(todoText);
    e.currentTarget.reset();
    setTodoText("");
  };

  return (
    <form className="w-full max-w-sm py-4" onSubmit={submitHandler}>
      <div className="flex items-center  py-2 ">
        <input
          className="appearance-none bg-transparent border-b border-teal-500 border-opacity-30 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Tengo pendiente..."
          aria-label="Tarea pendiente"
          name="newTodoText"
          onChange={changeHandler}
          autoComplete="off"
        />
        <button
          className="flex-shrink-0 bg-fill-green hover:bg-pointer-circle border-fill-green hover:border-pointer-circle text-sm border-4 text-text-white py-1 px-2 rounded"
          type="submit"
          disabled={!todoText}
        >
          Crear nota
        </button>
      </div>
    </form>
  );
};
