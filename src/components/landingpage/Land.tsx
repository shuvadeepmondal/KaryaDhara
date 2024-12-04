import React, { useState } from "react";

const Land: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="relative bg-transparent h-full flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl text-white font-bold mb-4 text-center">To-Do List</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded-l-lg border-none outline-none"
            placeholder="Add a task"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg flex justify-between"
            >
              {task}
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Land;
