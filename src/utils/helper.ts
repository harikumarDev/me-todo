import { TodoFormData } from "./types";

export const getErrorMessage = (err: any) =>
  err.response?.data?.message || "Something went wrong";

export const getDateAndTime = (date: string) => {
  const d = new Date(date);
  const dateStr = d.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "long",
    day: "numeric",
  });
  const timeStr = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${dateStr}, ${timeStr}`;
};

export const validateTodo = (todo: TodoFormData) => {
  const { title, description } = todo;

  if (!(title && title.trim().length)) {
    return { success: false, msg: "Title is required" };
  }

  if (title && (title.trim().length < 3 || title.trim().length > 150)) {
    return {
      success: false,
      msg: "Title should be between 3 and 150 characters",
    };
  }

  if (description && description.trim().length > 300) {
    return {
      success: false,
      msg: "Description should be less than 300 characters",
    };
  }

  for (let i = 0; i < todo.tasks.length; i++) {
    const task = todo.tasks[i];

    if (!(task.summary && task.summary.trim().length)) {
      return { success: false, msg: "Task summary is required" };
    }
  }

  return { success: true };
};
