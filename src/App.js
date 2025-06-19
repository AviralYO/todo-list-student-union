import React, { useState } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaTasks, FaCalendarAlt, FaCog } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

function combine() {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="content-container">
        <CalendarPanel />
        <TaskPanel />
      </div>
    </div>
  );
}




function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [activePanel, setActivePanel] = useState("calendar");


  return (
    <div className="app">
      <Sidebar setActivePanel={setActivePanel} />
      <main className="main">
  {activePanel === "calendar" && (
  <CalendarPanel
    selectedDate={selectedDate}
    setSelectedDate={setSelectedDate}
    tasks={tasks}
    setActivePanel={setActivePanel} 
  />
)}

  {activePanel === "tasks" && (
    <TaskPanel
      selectedDate={selectedDate}
      tasks={tasks}
      setTasks={setTasks}
    />
  )}
  {activePanel === "settings" && <div className="placeholder">⚙️ Settings coming soon...</div>}
</main>

    </div>
  );
}
function CalendarPanel({ selectedDate, setSelectedDate, tasks, setActivePanel }) {
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setActivePanel("tasks"); 
  };

  return (
    <div className="calendar-panel">
      <h2>📅 Pick a Date</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
    </div>
  );
}
function Sidebar({ setActivePanel }) {
  return (
    <div className="sidebar">
      <h1>📘 <strong>TaskMaster</strong></h1>
      <ul>
        <li onClick={() => setActivePanel("calendar")}>
          <FaCalendarAlt /> Calendar
        </li>
        <li onClick={() => setActivePanel("tasks")}>
          <FaTasks /> Tasks
        </li>
        <li onClick={() => setActivePanel("settings")}>
          <FaCog /> Settings
        </li>
      </ul>
    </div>
  );
}
function TaskPanel({ selectedDate, tasks, setTasks }) {
  const [newTask, setNewTask] = useState('');
  const dateKey = selectedDate.toDateString();

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = { ...tasks };
    if (!updated[dateKey]) updated[dateKey] = [];
    updated[dateKey].push({ text: newTask, done: false });
    setTasks(updated);
    setNewTask('');
  };

  const toggleDone = (i) => {
    const updated = { ...tasks };
    updated[dateKey][i].done = !updated[dateKey][i].done;
    setTasks(updated);
  };

  const removeTask = (i) => {
    const updated = { ...tasks };
    updated[dateKey].splice(i, 1);
    setTasks(updated);
  };

  return (
    <div className="task-panel glass">
      <h3>🗂 Tasks for {dateKey}</h3>
      <div className="task-input">
        <input
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>➕</button>
      </div>
      <ul className="task-list">
        {tasks[dateKey]?.map((task, i) => (
          <li key={i} className={task.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(i)}
              />
              <span>{task.text}</span>
            </label>
            <button onClick={() => removeTask(i)}>
              <FaTrash />
            </button>
          </li>
        )) || <p>No tasks</p>}
      </ul>
    </div>
  );
}





export default App;
