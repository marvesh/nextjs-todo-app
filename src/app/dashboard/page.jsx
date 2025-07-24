"use client";

import { useState, useEffect } from "react";
import { UserCircle, History, SunMoon, CalendarClock } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");

  // Update current time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTask = () => {
    if (!taskText.trim() || !taskDate || !taskTime) return;
    const newTask = { text: taskText, date: taskDate, time: taskTime };
    setTasks([...tasks, newTask]);
    setTaskText("");
    setTaskDate("");
    setTaskTime("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-72 w-full bg-gray-900 p-4 border-r border-gray-800">
        <div className="flex flex-col items-center space-y-5 text-center">
          {/* Profile */}
          <div className="flex flex-col items-center space-y-1">
            <UserCircle size={48} />
            <h2 className="text-lg font-semibold">Welcome</h2>
          </div>

          {/* Current Date & Time */}
          <div className="w-full border-t border-gray-700 pt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <CalendarClock size={16} />
              <span>{currentDateTime}</span>
            </div>
          </div>

          {/* History */}
          <div className="w-full border-t border-gray-700 pt-4">
            <div className="flex items-center space-x-2">
              <History size={18} />
              <span>History (Total: {tasks.length})</span>
            </div>
            <ul className="text-sm mt-2 max-h-32 overflow-y-auto text-gray-400">
              {tasks.map((task, index) => (
                <li key={index}>
                  • {task.text} ({task.date})
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Switch Placeholder */}
          <div className="w-full border-t border-gray-700 pt-4">
            <div className="flex items-center space-x-2">
              <SunMoon size={18} />
              <span>Theme Switch (coming soon)</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center md:text-left">My Tasks</h1>

          {/* Task Input Form */}
          <div className="bg-gray-800 p-4 rounded-lg mb-6 space-y-3 shadow">
            <input
              type="text"
              placeholder="Enter a task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="w-full px-3 py-2 text-white placeholder-gray-400 bg-gray-700 rounded focus:outline-none"
            />
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full px-3 py-2 text-white bg-gray-700 rounded focus:outline-none"
            />
            <input
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              className="w-full px-3 py-2 text-white bg-gray-700 rounded focus:outline-none"
            />
            <button
              onClick={addTask}
              className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
            >
              Add Task
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-gray-400 text-center">No tasks yet.</p>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-3 rounded flex justify-between items-center shadow"
                >
                  <div>
                    <p className="font-semibold">{task.text}</p>
                    <p className="text-sm text-gray-300">
                      {task.date} at {task.time}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
