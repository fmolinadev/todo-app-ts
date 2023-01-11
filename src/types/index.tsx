export interface TodoType {
  id: string;
  text: string;
  isDone: boolean;
  date: string;
}

export type TodoAction =
  | {
      type: "add";
      payload: {
        text: string;
      };
    }
  | {
      type: "delete" | "update";
      payload: {
        id: string;
      };
    };
