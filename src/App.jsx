import { useState } from "react";
import Modal from "./components/Modal";
import Column from "./components/Column";
import TodoProvider from "./Context/TodoContext";
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TodoProvider>
        <div className="container mx-auto">
          <div className="my-8 text-center">
            <h1 className="text-4xl font-bold  mb-8">Kanban Todo List</h1>

            <button
              className="text-lg bg-black text-white w-1/3 py-4 px-4 rounded-md font-medium uppercase"
              onClick={() => setShowModal(true)}
            >
              Add Todo
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            <Column status="New" />
            <Column status="Ongoing" />
            <Column status="Done" />
          </div>
        </div>
      </TodoProvider>
    </>
  );
}

export default App;
