import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function TodoItem({ todo }) {
  const [showMenu, setShowMenu] = useState(false);
  const [dueDate, setDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate) : new Date()
  );
  
  const statusBorderColor = {
    New: "border-blue-200",
    Ongoing: "border-orange-200",
    Done: "border-green-200",
  };
  const statusColor = {
    New: "bg-blue-200",
    Ongoing: "bg-orange-200",
    Done: "bg-green-200",
  };

  useEffect(() => {
    if (todo.status === "Ongoing" && todo.dueDate) {
      const interval = setInterval(() => {
        if (new Date() > new Date(todo.dueDate)) {
          alert(`Task "${todo.title}" is overdue!`);
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [todo]);

  return (
    <>
      <div
        className={`p-2 rounded shadow-sm ${
          statusBorderColor[todo.status]
        } border-2 flex justify-between align-middle`}
      >
        <div>
          <h3 className="text-xl mb-3 text-gray-700">{todo.title}</h3>
          <p className="text-sm text-gray-500 mb-3">{todo.description}</p>
          <div className="mb-4">
            {todo.status === "Ongoing" && (
              <DateTimePicker
                onChange={setDueDate}
                value={dueDate}
                onBlur={() => setDueDate(todo.dueDate)}
              
              />
            )}
          </div>
          <p
            className={`text-sm w-max p-1 rounded mr-2 text-gray-700 ${
              statusColor[todo.status]
            }`}
          >
            {todo.status}
          </p>
        </div>
        <div>
          <FaEllipsisV
            className="cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
          <ContextMenu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            todoId={todo.id}
            currentStatus={todo.status}
            todo={todo}
          />
        </div>
      </div>
    </>
  );
}

export default TodoItem;
