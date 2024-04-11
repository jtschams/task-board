// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId(task) {
    if (!nextId) {
        nextId = 0;
    }
    $(task).prop('id', nextId);
    nextId++;
    localStorage.setItem("nextId", nextId)
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const task = {
        title: $('#formTitle').val(),
        dueDate: $('#formDate').val(),
        description: $('#formDescription').val()
    }
    generateTaskId(task);
    createTaskCard(task);
    if (!taskList) {
        taskList = [];
    }
    taskList.push(task);
    localStorage.setItem("tasks", taskList)
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    event.preventDefault();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

$('#addTask').on('submit', handleAddTask);