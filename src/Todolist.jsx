import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Bgmobilelight from "./assets/Bgmobilelight.jpg";
import Bgmobiledark from "./assets/Bgmobiledark.jpg";
import Moonicon from "./assets/Moonicon.svg";
import Crossicon from "./assets/Crossicon.svg";
import Sunicon from "./assets/Sunicon.svg";
import bg from "./assets/bg.jpg"
import Bgdarkdesktop from "./assets/Bgdesktopdark.jpg"
import { v4 as uuidv4 } from 'uuid';

function Todolist() {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), text: "Complete online JavaScript course"},
    { id: uuidv4(), text: "Jog around the park 3s"},
    { id: uuidv4(), text: "10 minutes meditation"},
    { id: uuidv4(), text: "Read for 1 hour"},
    { id: uuidv4(), text: "Pick up groceries"},
    { id: uuidv4(), text: "Complete Todo app on Frontend Mentor"},
  ]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [radioSelected, setRadioSelected] = useState(false); // Manages radio button state

  const [changeColor, setChangeColor] = useState(false);

  // add task to list
  function addTask() {
    if (newTask.trim() !== "") {
      const newTaskObject = { id: tasks.length +1, text: newTask}
      setTasks([...tasks, newTaskObject]); // Add the new task to the list
      document.getElementById("task-input").value = ''; // clear input field after adding
      setRadioSelected(false); 
      setTaskNo(tasks.length+1);
    }
  }

  function removeTask(taskId) {
    setTasks(tasks.filter(task => task.id !== taskId));  // Filter out the task to be removed
    setTaskNo(tasks.length-1);
  }

  function checkTask(taskId) {
    const taskToComplete = tasks.find(task => task.id === taskId);
    if (taskToComplete) {
      setCompletedTasks([...completedTasks, taskToComplete]);
      setTasks(tasks.filter(task => task.id !== taskId)); // Remove the completed task from the list
      setCompletedTaskNo(completedTasks.length+1);
      setTaskNo(tasks.length-1);
    }
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
  }

  function darkTheme(){
    if(window.innerWidth<=400){
    document.getElementById("bg-light-mobile").style.display = "none";
    document.getElementById("bg-dark-mobile").style.display = "block";
    document.getElementById("sun-icon").style.display = "block"
    document.getElementById("moon-icon").style.display = "none";
    document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
    setChangeColor(!changeColor);
    }else{
      document.getElementById("bg-light-desktop").style.display = "none";
      document.getElementById("bg-dark-desktop").style.display = "block";
      document.getElementById("sun-icon").style.display = "block"
      document.getElementById("moon-icon").style.display = "none";
      document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
      setChangeColor(!changeColor);
    }
  }

  function lightTheme(){
    if(window.innerWidth<=400){
    document.getElementById("bg-light-mobile").style.display = "block";
    document.getElementById("bg-dark-mobile").style.display = "none";
    document.getElementById("sun-icon").style.display = "none"
    document.getElementById("moon-icon").style.display = "block";
    document.body.style.backgroundColor = "hsl(236, 33%, 92%)";
    setChangeColor(!changeColor);
    }
    else{
      document.getElementById("bg-light-desktop").style.display = "block";
      document.getElementById("bg-dark-desktop").style.display = "none";
      document.getElementById("sun-icon").style.display = "none"
      document.getElementById("moon-icon").style.display = "block";
      document.body.style.backgroundColor = "hsl(236, 33%, 92%)";
      setChangeColor(!changeColor);
    }
  }

  // Function to handle the radio input change
  const handleRadioChange = () => {
    setRadioSelected(true); // Set the radio to selected
    addTask(); // Automatically add the task when the radio is clicked
  };

  return (
    <>
    <div className="icons">
      <h1 className="text-light todo">T O D O</h1>
      <img id="moon-icon" onClick={darkTheme} className="moon-icon" src={Moonicon} alt="moon" />
      <img onClick={lightTheme} id="sun-icon" className="sun-icon" src={Sunicon} alt="moon" />
      </div>
      <img id="bg-dark-desktop" className="bg-dark-desktop" src={Bgdarkdesktop} alt="bg-desktop-dark" />
      <img id="bg-light-desktop" className="bg-light-desktop" src={bg} alt="bg-desktop-light" />
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
            {completedTasks.map((completedtask) => (<li 
             style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '',
              color: changeColor ? 'hsl(234, 39%, 85%)' : ''
             }}
            id="main-completed-task" className="font-weight-bold list-item p-3 list-group-item" key={completedtask.id}>{completedtask.text}</li>))} 
              <li style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '',
                color: changeColor ? 'hsl(234, 39%, 85%)' : ''
               }} className="list-item2 font-weight-bold p-3 list-group-item">{completedTasks.length} tasks completed <span onClick={clearCompletedList} className="clear-span">Clear list</span> </li>
        </ul>
        <ul id="task-list" className="list-group task-list">
  {tasks.map((task) => (
    <li id="main-task" className="font-weight-bold list-item list-group-item" key={task.id}
      style={{ 
        backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '',
        color: changeColor ? 'hsl(234, 39%, 85%)' : ''
      }}>
      <input id="check-input" onClick={() => checkTask(task.id)} className="check-input" type="radio" />
      <span>{task.text}</span>
      <img onClick={(e) => { 
          e.stopPropagation();
          removeTask(task.id)
        }} className="cross-img" src={Crossicon} alt="cross-icon" />
    </li>
  ))}
  <li style={{ 
      backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '',
      color: changeColor ? 'hsl(234, 39%, 85%)' : ''
    }} className="list-item2 font-weight-bold p-3 list-group-item">
    {tasks.length} items left
  </li>
</ul>
        <div style={{ backgroundColor: changeColor ? 'hsl(235, 24%, 19%)' : '',
                color: changeColor ? 'hsl(234, 39%, 85%)' : ''
               }} className="rounded position-relative task-status">
          <p id="all-status" onClick={showAll} className="stat-1">All</p>
          <p id="complete-status" onClick={showComplete} className="stat-3">Completed</p>
        </div>
        <p style={{ 
                color: changeColor ? 'hsl(234, 39%, 85%)' : ''
               }} className="position-relative drag-p">Click circle to move task to completed</p>
        </div> 
      </div>
    </>
  );
}

export default Todolist;
