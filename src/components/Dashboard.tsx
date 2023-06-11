import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { v4 as uuidV4 } from "uuid";
import { toast } from "react-toastify";
import Layout from "./Layout";
import Todos from "./Todos";
import { Todo, TodoFormData } from "../utils/types";
import { TodoContext } from "../contexts/TodoContext";
import { validateTodo } from "../utils/helper";
import TodoDialog from "./TodoDialog";

function Dashboard() {
  const { todos, setTodos } = useContext(TodoContext);
  const [todo, setTodo] = useState<TodoFormData>({
    title: "",
    description: "",
    tasks: [],
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { success, msg } = validateTodo(todo);
    if (!success) {
      toast.error(msg);
      return;
    }

    const newTodo: Todo = {
      id: uuidV4(),
      title: todo.title.trim(),
      description: todo?.description?.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      tasks: todo.tasks.map((task) => ({
        ...task,
        summary: task.summary.trim(),
      })),
    };

    handleClose();
    setTodo({
      title: "",
      description: "",
      tasks: [],
    });
    setTodos([newTodo, ...todos]);
  };

  return (
    <Layout title="Dashboard - Todo">
      <div className="pt-14 min-h-screen flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/5 p-4">
          <div className="md:mt-8 mt-2 flex justify-between items-center">
            <h3 className="text-2xl font-bold">My Todos</h3>
            <Button
              variant="outlined"
              size="small"
              className="flex items-center"
              onClick={handleClickOpen}
            >
              <Add fontSize="small" />
              <span className="mr-2 ml-1">New</span>
            </Button>
          </div>
          <div className="mt-4 p-2">
            <Todos todos={todos} />
          </div>
        </div>
      </div>

      <TodoDialog
        isNew={true}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleAddTodo}
        handleChange={handleChange}
        todo={todo}
        setTodo={setTodo}
      />
    </Layout>
  );
}

export default Dashboard;
