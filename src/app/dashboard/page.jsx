"use client";

import { useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const addTask = () => {
    if (taskText.trim() === "" || taskDate === "" || taskTime === "") return;

    const newTask = {
      text: taskText,
      date: taskDate,
      time: taskTime,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
    setTaskDate("");
    setTaskTime("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-4">
        <h1 className="text-xl font-bold mb-3 text-gray-800">My Tasks</h1>

        {/* Form with reduced width */}
        <div className="flex flex-col gap-2 mb-3 text-md w-70 mx-auto">
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            type="text"
            placeholder="Task"
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          <input
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            type="date"
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          <input
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            type="time"
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-pink-600 text-white px-3 py-2 rounded text-sm hover:bg-pink-800"
          >
            Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No tasks yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center border px-3 py-1 rounded"
              >
                <div>
                  <p className="font-medium">{task.text}</p>
                  <p className="text-xs text-gray-500">
                    {task.date} at {task.time}
                  </p>
                </div>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700 text-xs"
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
