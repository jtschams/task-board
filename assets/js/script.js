// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Generate a unique task id
function generateTaskId(task) {
    if (!nextId) {
        nextId = 0;
    }
    $(task).prop('id', nextId);
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Create a task card
function createTaskCard(task) {
    $(`#${task.todoStatus}-cards`).append(`<div class="card">
    <div class="card-header bg-white">
      <h2 class="card-title mb-1">${task.title}</h2>
    </div>
    <div class="card-body bg-light">
      <div class="m-2">${task.description}</div>
      <div class="m-2">${task.dueDate}</div>
      <button type="button" class="btn btn-primary btn-danger">Delete</button>
    </div>
  </div>`)
}

// Render the task list
function renderTaskList() {
    for (task of taskList) {
        createTaskCard(task);
    }
}

// Handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const task = {
        title: $('#formTitle').val(),
        dueDate: $('#formDate').val(),
        description: $('#formDescription').val(),
        todoStatus: 'todo'
    }
    $('.form-control').val('');
    generateTaskId(task);
    createTaskCard(task);
    if (!taskList) {
        taskList = [];
    }
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

//!!! Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

//!!! Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

//!!! Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $( function() {
        $( "#todo-cards, #in-progress-cards, #done-cards" ).sortable({
            connectWith: ".listedTask"
        }).disableSelection();
    } );
    $('#addTask').on('submit', handleAddTask);
});