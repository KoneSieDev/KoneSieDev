import { useState } from "react";
import "./index.css";
function App() {
  const [tasks, setTasks] = useState([]);


  function createTask() {
    const task = document.getElementById("text_input");

    if (task.value.length === 0) {
      alert("Saisissez quelque chose SVP...");
    } else {
      setTasks([...tasks, task.value]);
      task.value = "";
    }
  }
  function refreshTask() {
    setTasks([]);
  }

  function deleteTask(taskIndex) {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  }

  function handleEdit(taskIndex) {
    const taskElement = document.getElementById(`task_${taskIndex}`);
    const editInputElement = document.getElementById(`edit_input_${taskIndex}`);
    const editButtonElement = document.getElementById(
      `edit_button_${taskIndex}`
    );
    const deleteButtonElement = document.getElementById(
      `delete_button_${taskIndex}`
    );
    const modifyButtonElement = document.getElementById(
      `modify_button_${taskIndex}`
    );

    taskElement.style.display = "block";
    editInputElement.value = tasks[taskIndex];
    editInputElement.style.display = "block";
    editButtonElement.style.display = "none";
    deleteButtonElement.style.display = "none";
    modifyButtonElement.style.display = "block";
  }

  function handleSave(taskIndex) {
    const taskElement = document.getElementById(`task_${taskIndex}`);
    const editInputElement = document.getElementById(`edit_input_${taskIndex}`);
    const editButtonElement = document.getElementById(
      `edit_button_${taskIndex}`
    );
    const deleteButtonElement = document.getElementById(
      `delete_button_${taskIndex}`
    );
    const modifyButtonElement = document.getElementById(
      `modify_button_${taskIndex}`
    );

    const newTasks = [...tasks];
    newTasks[taskIndex] = editInputElement.value;
    setTasks(newTasks);

    taskElement.style.display = "";
    taskElement.textContent = editInputElement.value;
    editInputElement.style.display = "none";
    editButtonElement.style.display = "block";
    deleteButtonElement.style.display = "block";
    modifyButtonElement.style.display = "none";
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createTask();
    }
  };

  return (
    <div className="container">
      <div id="newtask">
        <input
          type="text"
          id="text_input"
          placeholder="Titre..."
          onKeyDown={handleKeyDown}
        />
        <button id="push" onClick={createTask}>
          Ajouter
        </button>
      </div>
      {tasks.length > 1 && (
        <button id="refresh" onClick={refreshTask}>
          vider
        </button>
      )}
      <div className="card" id="todo-list">
      {tasks.map((task, index) => (
        <div key={index} className="task">
          <span id={`task_${index}`}>{task}</span>
          <input
            className="edit_input"
            type="text"
            id={`edit_input_${index}`}
            style={{ display: "none" }}
          />
          <button
            className="modify"
            id={`modify_button_${index}`}
            onClick={() => handleSave(index)}
            style={{ display: "none" }}
          >
            {" "}
            <i className="fa-solid fa-check"></i>
          </button>
          <button
            className="editer"
            id={`edit_button_${index}`}
            onClick={() => handleEdit(index)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="effacer"
            id={`delete_button_${index}`}
            onClick={() => deleteTask(index)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
