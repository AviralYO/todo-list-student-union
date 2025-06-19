import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setTasks([...tasks, trimmed]);
      setInput("");
    }
  };

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <input
        type="text"
        id="taskInput"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul id="taskList">
        {tasks.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

