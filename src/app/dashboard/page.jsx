"use client";

import { useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">My Tasks</h1>

        <div className="flex mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter a new task"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-800"
          >
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center border px-4 py-2 rounded"
              >
                <span>{task}</span>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
