import { useState } from "react";

interface Props {
  createToDo: (text: string) => void;
}

export const Form = ({ createToDo }: Props) => {
  const [todoText, setTodoText] = useState<string>("");

  const changeHandler = (e: React.FormEvent<HTMLInputElement>): void =>
    setTodoText(e.currentTarget.value);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (todoText === "") return;
    createToDo(todoText);
    e.currentTarget.reset();
    setTodoText("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="newTodoText"
        onChange={changeHandler}
        autoComplete="off"
      />
      <button type="submit" disabled={!todoText}>
        Crear Nota
      </button>
    </form>
  );
};
