import React, { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function ContextMenu({ showMenu, setShowMenu, todoId, currentStatus,todo }) {
  const { moveTodo } = useContext(TodoContext);
  const [dueDate, setDueDate] = useState(new Date());

  const handleMove = (status) => {
    if (status === "Ongoing") {
      moveTodo(todoId, status, dueDate);
    } else {
      moveTodo(todoId, status);
    }
  };

  const statuses = ["New", "Ongoing", "Done"].filter(
    (status) => status !== currentStatus
  );

  return (
    <>
      {showMenu ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative lg:w-1/3 md:w-1/2 w-11/12 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">{todo.title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-2xl leading-none font-semibold"
                    onClick={() => setShowMenu(false)}
                  >
                    ×
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex flex-col gap-4">
                  {statuses.map((status) => (
                    <div key={status} className="flex flex-col gap-2">
                      {status === "Ongoing" ? (
                        <>
                          <DateTimePicker
                            onChange={setDueDate}
                            value={dueDate}
                            className="hover:bg-gray-200 p-2"
                          />
                          <button
                            onClick={() => handleMove(status)}
                            className="hover:bg-gray-200 p-2"
                          >
                            {status}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleMove(status)}
                          className="hover:bg-gray-200 p-2"
                        >
                          {status}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default ContextMenu;
