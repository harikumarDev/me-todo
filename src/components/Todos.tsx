import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox, Tooltip } from "@mui/material";
import {
  EditOutlined,
  DeleteOutline,
  ArrowDropDown,
} from "@mui/icons-material";
import { Todo, TodoProps } from "../utils/types";
import { getDateAndTime, validateTodo } from "../utils/helper";
import { TodoContext } from "../contexts/TodoContext";
import TodoDialog from "./TodoDialog";

function Todos({ todos }: TodoProps) {
  const { setTodos } = useContext(TodoContext);
  const [open, setOpen] = useState(false);
  const defaultTodo = {
    id: "",
    title: "",
    description: "",
    completed: false,
    createdAt: "",
    tasks: [],
  };
  const [todo, setTodo] = useState<Todo>(defaultTodo);
  const [todoOpen, setTodoOpen] = useState<string | boolean>(false);

  const handleUpdate = (todo: Todo) => () => {
    const ind = todos.findIndex((t) => t.id === todo.id);

    const { success, msg } = validateTodo(todo);
    if (!success) {
      toast.error(msg);
      return;
    }

    if (ind !== -1) {
      const newTodos = [...todos];

      newTodos[ind] = todo;
      setTodos(newTodos);
    }
    handleClose();
  };

  const handleClickOpen = (todo: Todo) => {
    setOpen(true);
    setTodo(todo);
  };

  const handleClose = () => {
    setOpen(false);
    setTodo(defaultTodo);
  };

  const handleEdit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    handleUpdate(todo)();
  };

  const handleDelete = (todoId: string) => {
    if (!window.confirm("Are you sure, you want to delete this todo?")) return;

    const newTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(newTodos);
  };

  const handleSelect = (todoId: string) => {
    if (todoOpen === todoId) {
      setTodoOpen(false);
    } else {
      setTodoOpen(todoId);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <div
              className={`flex items-center justify-between px-4 py-3 hover:bg-zinc-50 hover:scale-x-[1.005] transition-all duration-200 ${
                todoOpen && todoOpen === todo.id && "bg-zinc-50"
              }`}
            >
              <div className="flex items-center">
                <span className="-mb-1">
                  <Checkbox
                    checked={todo.completed}
                    color="success"
                    onChange={handleUpdate({
                      ...todo,
                      completed: !todo.completed,
                    })}
                  />
                </span>
                <p
                  className={`text-lg truncate max-w-[14rem] md:max-w-md lg:max-w-md ${
                    todo.completed && "line-through text-gray-500"
                  }`}
                >
                  {todo.title}
                </p>
              </div>
              <div className="flex items-center">
                <div className="hidden lg:block text-sm text-gray-400">
                  {getDateAndTime(todo.createdAt)}
                </div>
                <div className="flex gap-2 ml-4">
                  <div
                    className="-mt-1 rounded-full cursor-pointer text-blue-700"
                    onClick={() => handleClickOpen(todo)}
                  >
                    <Tooltip title="Edit" placement="top">
                      <EditOutlined fontSize="small" />
                    </Tooltip>
                  </div>
                  <div
                    className="-mt-1 cursor-pointer text-red-500"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <Tooltip title="Delete" placement="top">
                      <DeleteOutline fontSize="small" />
                    </Tooltip>
                  </div>
                  <div
                    className={`cursor-pointer ml-2 ${
                      todoOpen === todo.id && "transform rotate-180"
                    } transition-all duration-300`}
                    onClick={() => handleSelect(todo.id)}
                  >
                    <Tooltip title="Show More" placement="top">
                      <ArrowDropDown />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`px-16 pb-4 bg-zinc-50 ${
                todoOpen && todoOpen === todo.id ? "block" : "hidden"
              }`}
            >
              <div>
                <span className="text-md font-semibold">Description: </span>
                <span>
                  {todo.description ? (
                    todo.description
                  ) : (
                    <span className="text-gray-500">{`<No description>`}</span>
                  )}
                </span>
              </div>

              {todo.tasks.length > 0 &&
                todo.tasks.map((task) => (
                  <div key={task.id} className="flex items-center mt-1 px-2">
                    <span className="-mb-1">
                      <Checkbox
                        checked={task.isDone}
                        color="info"
                        size="small"
                        onChange={handleUpdate({
                          ...todo,
                          tasks: todo.tasks.map((t) =>
                            t.id === task.id ? { ...t, isDone: !t.isDone } : t
                          ),
                        })}
                      />
                    </span>
                    <p
                      className={`text-lg truncate max-w-[14rem] md:max-w-md lg:max-w-md ${
                        task.isDone && "line-through text-gray-500"
                      }`}
                    >
                      {task.summary}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {todos.length === 0 && (
          <div className="text-center py-4 text-gray-500">No Todos found</div>
        )}
      </div>

      <TodoDialog
        isNew={false}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleEdit}
        handleChange={handleChange}
        todo={todo}
        setTodo={setTodo}
      />
    </div>
  );
}

export default Todos;
