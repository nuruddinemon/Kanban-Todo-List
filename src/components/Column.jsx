import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../Context/TodoContext";

function Column({ status }) {
  const { todos } = useContext(TodoContext);

  let sortedTodos = todos.filter((todo) => todo.status === status);

  if (status === "Done") {
    sortedTodos = sortedTodos.sort(
      (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
    );
  }

  return (
    <div className=" rounded px-2 py-2 border-[#ccc] border-[1px]">
      {/* <!-- board category header --> */}
      <div className="flex flex-row justify-between mb-2 mx-1 sm:h-10 ">
        <div className="flex items-center">
          <h2 className=" bg-gray-200  text-lg w-max px-4 py-2 rounded mr-2 text-gray-700 capitalize font-semibold ">
            {status}
          </h2>
          <p className="text-gray-400 text-base">{sortedTodos.length}</p>
        </div>
      </div>
      {/* <!-- board card --> */}
      <div className="grid grid-rows-2 gap-2">
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default Column;
