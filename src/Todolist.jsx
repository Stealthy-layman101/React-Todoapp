import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Bgmobilelight from "./assets/Bgmobilelight.jpg";
import Bgmobiledark from "./assets/Bgmobiledark.jpg";
import Moonicon from "./assets/Moonicon.svg";
import Crossicon from "./assets/Crossicon.svg";
import Sunicon from "./assets/Sunicon.svg";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Todolist() {
  const [tasks, setTasks] = useState([
    "Complete online JavaScript course",
    "Jog around the park 3s",
    "10 minutes meditation",
    "Read for 1 hour",
    "Pick up groceries",
    "Complete Todo app on Frontend Mentor",
  ]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [completedTaskNo, setCompletedTaskNo] = useState(0);

  const [newTask, setNewTask] = useState("");

  const [radioSelected, setRadioSelected] = useState(false); // Manages radio button state

  const [taskNo, setTaskNo] = useState(5);

  const [changeColor, setChangeColor] = useState(false);

  // add task to list
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]); // Add the new task to the list
      document.getElementById("task-input").value = ''; // clear input field after adding
      setRadioSelected(false); 
      setTaskNo(tasks.length+1);
    }
  }

  function removeTask(taskToRemove) {
    setTasks(tasks.filter(task => task !== taskToRemove));  // Filter out the task to be removed
    setTaskNo(tasks.length-1);
  }

  function checkTask(completeTask, index) {
    const removedCompleteTask = tasks[index];
    completedTasks.push(removedCompleteTask);

    // Get the task list items
    const taskList = document.getElementById("task-list").children;

    // Apply the strikethrough style to the completed task
    taskList[index].style.textDecoration = "line-through";

    setCompletedTaskNo(completedTasks.length);
    console.log(completedTasks);

/*     document.getElementById("check-input").style.pointerEvents = "none"; */
  }

  function showComplete(){
    document.getElementById("task-list").style.display = "none";
    document.getElementById("completed-task-list").style.display = "block";
    document.getElementById("complete-status").style.color = "hsl(220, 98%, 61%)";
    document.getElementById("all-status").style.color = "";
  }

  function showAll(){
    document.getElementById("task-list").style.display = "block";
    document.getElementById("completed-task-list").style.display = "none";
    document.getElementById("all-status").style.color = "hsl(220, 98%, 61%)";
    document.getElementById("complete-status").style.color = "";
  }

  function clearCompletedList(){
    setCompletedTasks([]);
    setCompletedTaskNo(0);
  }

  function darkTheme(){
    document.getElementById("bg-light-mobile").style.display = "none";
    document.getElementById("bg-dark-mobile").style.display = "block";
    document.getElementById("sun-icon").style.display = "block"
    document.getElementById("moon-icon").style.display = "none";
    document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
    setChangeColor(!changeColor);
  }

  function lightTheme(){
    document.getElementById("bg-light-mobile").style.display = "block";
    document.getElementById("bg-dark-mobile").style.display = "none";
    document.getElementById("sun-icon").style.display = "none"
    document.getElementById("moon-icon").style.display = "block";
    document.body.style.backgroundColor = "hsl(236, 33%, 92%)";
    setChangeColor(!changeColor);
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  // Function to handle the radio input change
  const handleRadioChange = () => {
    setRadioSelected(true); // Set the radio to selected
    addTask(); // Automatically add the task when the radio is clicked
  };

  return (
    <>
      <h1 className="pt-5 ps-3 position-absolute text-light">T O D O</h1>
      <img id="moon-icon" onClick={darkTheme} className="position-absolute moon-icon" src={Moonicon} alt="moon" />
      <img onClick={lightTheme} id="sun-icon" className="position-absolute sun-icon" src={Sunicon} alt="moon" />
      <img id="bg-dark-mobile" className="bg-dark-mobile" src={Bgmobiledark} alt="bg-dark-mobile" />
      <img id="bg-light-mobile" className="bg-light-mobile" src={Bgmobilelight} alt="light-mobile-background" /> 
      <div className="container">
        <div style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '' }} id="task-input-div" className="position-relative border rounded task-input-div">
        <input style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '' }} id="task-add-input" checked={radioSelected} onChange={handleRadioChange} className="radio-input" type="radio"></input>
        <input style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : ''
         }} id="task-input" onChange={
          // set newTask to input value
          (e) => {
          setNewTask(e.target.value);
        }} className="ms-2 border-0 text-center task-input" type="text" placeholder="Create a new todo..."/>
        </div>
        <div className="tasks-div">
        <ul id="completed-task-list" className="list-group completed-task-list">
            {completedTasks.map((completedtask, index) => (<li 
             style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '',
              color: changeColor ? 'hsl(234, 39%, 85%)' : ''
             }}
            id="main-completed-task" className="font-weight-bold list-item p-3 list-group-item" key={index}>{completedtask}</li>))} 
              <li style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '',
                color: changeColor ? 'hsl(234, 39%, 85%)' : ''
               }} className="list-item2 font-weight-bold p-3 list-group-item">{completedTaskNo} tasks completed <span onClick={clearCompletedList} className="clear-span">Clear list</span> </li>
        </ul>
        <ul id="task-list" className="list-group task-list">
            {tasks.map((task, index) => (<li id="main-task" className="font-weight-bold list-item p-3 list-group-item" key={index}
             // Conditionally apply background color
             style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '',
              color: changeColor ? 'hsl(234, 39%, 85%)' : ''
              }}
            >{task}    
              <input id="check-input" onClick={() => checkTask(task, index)} className = " position-sticky check-input" type="radio" />
                  <img onClick={(e) => { 
                    e.stopPropagation();
                    removeTask(task)}} className="position-sticky cross-img" src={Crossicon} alt="cross-icon" /></li>))} 
              <li style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '',
                color: changeColor ? 'hsl(234, 39%, 85%)' : ''
               }} className="list-item2 font-weight-bold p-3 list-group-item">{taskNo} items left <span className="clear-span">Clear completed</span> </li>
        </ul>
        <div style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '',
                color: changeColor ? 'hsl(234, 39%, 85%)' : ''
               }} className="rounded position-relative task-status">
          <p id="all-status" onClick={showAll} className="stat-1">All</p>
          <p className="stat-2">Active</p>
          <p id="complete-status" onClick={showComplete} className="stat-3">Completed</p>
        </div>
        <p>Wait</p>
        <p style={{ 
                color: changeColor ? 'hsl(234, 39%, 85%)' : ''
               }} className="position-relative drag-p">Drag and drop to reorder list</p>
        </div> 
      </div>
    </>
  );
}

export default Todolist;
