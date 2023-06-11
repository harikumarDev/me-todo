import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";
import { Todo, TodoProviderProps } from "../utils/types";

export interface TodoContextInterface {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const TodoContext = createContext({
  todos: [],
  setTodos: (todos: Todo[]) => {},
});

export default function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<any>([]);

  useEffect(() => {
    const todos = localStorage.getItem("todos");

    if (typeof todos != "undefined" && todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  useEffect(() => {
    if (todos) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}
