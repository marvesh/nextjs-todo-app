"use client";

import { useState, useEffect } from "react";
import {
  UserCircle,
  History,
  SunMoon,
  CalendarClock,
  Menu,
  X,
} from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskCategory, setTaskCategory] = useState("General");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

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
    const newTask = {
      text: taskText,
      date: taskDate,
      time: taskTime,
      category: taskCategory,
      priority: taskPriority,
      done: false,
    };
    const updatedTasks = [...tasks, newTask].sort((a, b) => {
      const timeA = new Date(`${a.date}T${a.time}`);
      const timeB = new Date(`${b.date}T${b.time}`);
      return timeA - timeB;
    });
    setTasks(updatedTasks);
    setTaskText("");
    setTaskDate("");
    setTaskTime("");
    setTaskCategory("General");
    setTaskPriority("Medium");
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const toggleTaskDone = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const groupTasks = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const format = (date) => date.toISOString().split("T")[0];
    const todayStr = format(today);
    const tomorrowStr = format(tomorrow);

    const groups = { Today: [], Tomorrow: [], Upcoming: [] };
    tasks.forEach((task) => {
      if (task.date === todayStr) groups.Today.push(task);
      else if (task.date === tomorrowStr) groups.Tomorrow.push(task);
      else groups.Upcoming.push(task);
    });
    return groups;
  };

  const groupedTasks = groupTasks();

  const getTimeRemaining = (dateStr, timeStr) => {
    const now = new Date();
    const taskTime = new Date(`${dateStr}T${timeStr}`);
    const diff = taskTime - now;
    if (diff < 0) return "Overdue";
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min${mins !== 1 ? "s" : ""} left`;
    const hours = Math.floor(mins / 60);
    return `${hours} hour${hours !== 1 ? "s" : ""} left`;
  };

  const themeClasses = darkMode
    ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    : "bg-gradient-to-br from-white to-gray-100 text-gray-800";

  return (
    <div className={`min-h-screen ${themeClasses} flex flex-col md:flex-row`}>
      <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-700 z-20 bg-gray-900">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={() => setSidebarOpen(true)} className="text-gray-300 focus:outline-none">
          <Menu size={28} />
        </button>
      </div>

      <aside className={`${sidebarOpen ? "fixed" : "hidden"} md:block md:relative top-0 left-0 w-full md:w-72 h-full bg-gray-900 p-4 border-r border-gray-800 z-30`}>
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setSidebarOpen(false)}>
            <X size={28} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-5 text-center">
          <div className="flex flex-col items-center space-y-1">
            <UserCircle size={48} />
            <h2 className="text-lg font-semibold">Welcome</h2>
          </div>

          <div className="w-full border-t border-gray-700 pt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <CalendarClock size={16} />
              <span>{currentDateTime}</span>
            </div>
          </div>

          <div className="w-full border-t border-gray-700 pt-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
              <SunMoon size={18} />
              <span>Switch to {darkMode ? "Light" : "Dark"} Theme</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 overflow-y-auto z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center md:text-left">My Tasks</h1>

          <div className="bg-gray-800 p-4 rounded-lg mb-6 space-y-3 shadow">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Task</label>
                <input
                  type="text"
                  placeholder="Enter a task"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  className="w-full px-3 py-2 text-white placeholder-gray-400 bg-gray-700 rounded focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Work, Home"
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value)}
                  className="w-full px-3 py-2 text-white bg-gray-700 rounded focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  className="w-full px-3 py-2 text-white bg-gray-700 rounded focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Time</label>
                <input
                  type="time"
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                  className="w-full px-3 py-2 text-white bg-gray-700 rounded focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">Priority</label>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="w-full px-3 py-2 text-white bg-gray-700 rounded focus:outline-none"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <button onClick={addTask} className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">
              Add Task
            </button>
          </div>

          {Object.entries(groupedTasks).map(([group, groupTasks]) => (
            <div key={group} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{group}</h2>
              {groupTasks.length === 0 ? (
                <p className="text-gray-400 text-sm">No tasks for {group.toLowerCase()}.</p>
              ) : (
                groupTasks.map((task, index) => {
                  const status = getTimeRemaining(task.date, task.time);
                  const isOverdue = status === "Overdue";

                  const baseGradient = task.done
                    ? "from-green-200 to-green-300"
                    : isOverdue
                    ? "from-red-300 to-pink-400"
                    : group === "Today"
                    ? "from-blue-300 to-indigo-400"
                    : group === "Tomorrow"
                    ? "from-purple-300 to-pink-400"
                    : "from-teal-300 to-cyan-400";

                  return (
                    <div
                      key={`${task.text}-${task.date}-${task.time}-${index}`}
                      className={`bg-gradient-to-br ${baseGradient} text-gray-900 p-4 rounded-lg flex items-center justify-between mb-3 shadow-md`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleTaskDone(tasks.indexOf(task))}
                          className="h-5 w-5 text-green-600 accent-green-600 cursor-pointer mt-1"
                        />

                        <div className={`${task.done ? "line-through text-gray-500" : ""}`}>
                          <p className="font-semibold">{task.text}</p>
                          <p className="text-sm">
                            {task.date} at {task.time} – {" "}
                            <span className={`font-medium ${isOverdue ? "text-red-800" : "text-green-800"}`}>
                              {status}
                            </span>
                          </p>
                          <p className="text-xs mt-1">
                            Category: <span className="font-medium">{task.category}</span> | Priority: <span className="font-medium">{task.priority}</span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTask(tasks.indexOf(task))}
                        className="text-red-700 hover:text-red-900 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
