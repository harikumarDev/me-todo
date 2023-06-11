import React from "react";
import { v4 as uuidV4 } from "uuid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { AddCircleOutline, Cancel } from "@mui/icons-material";
import { TodoDialogProps } from "../utils/types";

function TodoDialog(props: TodoDialogProps) {
  const {
    isNew,
    open,
    handleClose,
    handleSubmit,
    handleChange,
    todo,
    setTodo,
  } = props;

  const handleTaskChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    taskId: string
  ) => {
    const ind = todo.tasks.findIndex((task) => task.id === taskId);

    if (ind !== -1) {
      const newTasks = [...todo.tasks];

      newTasks[ind] = {
        ...newTasks[ind],
        summary: e.target.value,
      };

      setTodo({
        ...todo,
        tasks: newTasks,
      });
    }
  };

  const handleAddSubtask = () => {
    setTodo({
      ...todo,
      tasks: [
        ...todo.tasks,
        {
          id: uuidV4(),
          summary: "",
          completed: false,
        },
      ],
    });
  };

  const removeSubTask = (id: string) => {
    setTodo({
      ...todo,
      tasks: todo.tasks.filter((task) => task.id !== id),
    });
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <h3 className="pt-5 pb-2 text-xl text-center font-bold">
        {isNew ? "Add" : "Update"} Todo
      </h3>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ paddingTop: "0" }}>
          <TextField
            autoFocus
            name="title"
            margin="normal"
            label="Title"
            type="text"
            fullWidth
            required
            variant="outlined"
            onChange={handleChange}
            value={todo.title}
          />
          <TextField
            name="description"
            margin="normal"
            multiline
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            rows={3}
            onChange={handleChange}
            value={todo.description}
          />
          <h4 className="text-lg font-medium mt-1">
            {isNew ? "Add" : "Modify"} Sub Tasks
          </h4>
          <div className="mt-2 flex flex-col items-center justify-center">
            <div className="mb-2 w-full">
              {todo.tasks &&
                todo.tasks.map((task) => (
                  <TextField
                    key={task.id}
                    name="summary"
                    margin="normal"
                    label={`Summary ${todo.tasks.indexOf(task) + 1}`}
                    type="text"
                    fullWidth
                    variant="outlined"
                    required
                    onChange={(e) => handleTaskChange(e, task.id)}
                    value={task.summary}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => removeSubTask(task.id)}>
                          <Cancel />
                        </IconButton>
                      ),
                    }}
                  />
                ))}
            </div>
            <div
              className="p-2 text-center border-dashed border-2 border-sky-500 w-4/5 cursor-pointer rounded-md"
              onClick={handleAddSubtask}
            >
              <div className="-mt-1 text-sky-500">
                <AddCircleOutline />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">{isNew ? "Add" : "Update"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TodoDialog;
