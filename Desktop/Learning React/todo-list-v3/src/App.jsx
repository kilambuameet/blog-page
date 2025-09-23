import React, { useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAdd = () => {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleDelete = (indexToDelete) => {
    const filteredList = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(filteredList);
  };

  const handleToggle = (indexToToggle) => {
    const updatedTask = tasks.map((task, index) => {
      if (index === indexToToggle) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTask);
  };

  console.log(task, "handle changes input");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 To-Do List</h1>

        {/* Input section */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border rounded"
            placeholder="Enter a task..."
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        <ul>
          {tasks.map((item, index) => {
            return (
              <li
                key={index}
                className="bg-gray-100 px-4 py-2 rounded flex justify-between items-center"
              >
                <span
                  onClick={() => handleToggle(index)}
                  className={`${
                    item.completed ? "line-through text-gray-500" : ""
                  } cursor-pointer `} 
                >
                  {item.text}
                </span>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
