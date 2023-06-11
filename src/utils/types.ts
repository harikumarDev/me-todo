import React, { ReactNode, SyntheticEvent } from "react";

type User = {
  name: string;
  email: string;
};

type UserProviderProps = {
  children: ReactNode;
};

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

type Task = {
  id: string;
  summary: string;
  isDone: boolean;
};

type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  tasks: Task[];
};

type TodoProps = {
  todos: Todo[];
};

type TodoProviderProps = {
  children: ReactNode;
};

type TodoFormData = {
  title: string;
  description?: string;
  tasks: Task[];
};

type TodoDialogProps = {
  isNew: boolean;
  open: boolean;
  handleClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
  todo: TodoFormData | Todo;
  setTodo: any;
};

export type {
  User,
  UserProviderProps,
  LayoutProps,
  LoginFormData,
  SignupFormData,
  Todo,
  TodoProps,
  TodoProviderProps,
  TodoFormData,
  Task,
  TodoDialogProps,
};
