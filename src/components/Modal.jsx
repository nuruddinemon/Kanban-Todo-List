import React, { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContext";

function Modal({ showModal, setShowModal }) {
  const { addTodo } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (title && description) {
      addTodo(title, description);
      setTitle("");
      setDescription("");
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              onSubmit={handleAddTodo}
              className="relative lg:w-1/3 md:w-1/2 w-11/12 my-6 mx-auto"
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">Add New List</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-2xl leading-none font-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col gap-4">
                  <div>
                    <label className="text-base">Title</label>
                    <input
                      type="text"
                      placeholder="Add Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="border-2 p-2 w-full rounded-md text-base mt-1 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-base">Description</label>
                    <textarea
                      type="Add Description"
                      className="border-2 p-2 w-full rounded-md text-base mt-1 placeholder:text-gray-500"
                      placeholder="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Add Todo
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
