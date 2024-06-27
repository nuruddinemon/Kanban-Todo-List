import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, description) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      status: "New",
      dueDate: null,
      completedAt: null,
    };
    setTodos([newTodo, ...todos]);
  };

  const moveTodo = (id, newStatus, dueDate = null) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: newStatus,
              dueDate: newStatus === "Ongoing" ? dueDate : todo.dueDate,
              completedAt: newStatus === "Done" ? new Date() : todo.completedAt,
            }
          : todo
      )
    );
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        moveTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
