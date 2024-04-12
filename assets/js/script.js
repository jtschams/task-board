// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Generate a unique task id
function generateTaskId(task) {
    $(task).prop('id', nextId);
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Create a task card
function createTaskCard(task) {
    const urgencyClasses = checkUrgency(task);
    $(`#${task.todoStatus}`).append(`<div class="card ${urgencyClasses} todo-card" id="${task.id}">
    <div class="card-header">
    <h2 class="card-title mb-1">${task.title}</h2>
    </div>
    <div class="card-body">
    <div class="m-2">${task.description}</div>
    <div class="m-2">${task.dueDate}</div>
    <button type="button" class="btn btn-outline-light btn-danger task-delete-button">Delete</button>
    </div>
    </div>`)
}

let checkUrgency = function(task) {
    let urgencyClass;
    const urgencyTime = dayjs(task.dueDate).diff(dayjs(), 'day') + 1;
    if (task.todoStatus == 'done-cards') {
        // urgencyClass = "bg-light"
        return;
    } else if (urgencyTime > 3) {
        urgencyClass = "text-white bg-primary"
    } else if (urgencyTime > 0) {
        urgencyClass = "text-white bg-warning"
    } else {
        urgencyClass = "text-white bg-danger"
    }
    return urgencyClass;
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
        todoStatus: 'todo-cards'
    }
    $('.form-control').val('');
    generateTaskId(task);
    createTaskCard(task);
    $( ".todo-card" ).draggable({
        revert: "invalid",
        connectToSortable: "#todo-cards, #in-progress-cards, #done-cards"
    });
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

//!!! Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const delId = $(this).parent().parent().attr('id');
    $(`#${delId}`).remove();
    taskList = taskList.filter((task) => task.id != delId);
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

//!!! Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const currentStatus = this.id;
    const cardTask = ui.draggable[0];
    for (task of taskList) {
        if (task.id == cardTask.id) {
            task.todoStatus = currentStatus;
            urgencyClasses = checkUrgency(task);
            $(cardTask).removeClass('text-white bg-danger bg-warning bg-primary');
            $(cardTask).addClass(urgencyClasses);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

//!!! Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    if (!taskList) {
        taskList = [];
    }
    if (!nextId) {
        nextId = 0;
    }
    renderTaskList();
    $( ".todo-card" ).draggable({
        revert: "invalid",
        connectToSortable: "#todo-cards, #in-progress-cards, #done-cards"
    });
    $( "#todo-cards, #in-progress-cards, #done-cards" ).droppable();
    $( "#todo-cards, #in-progress-cards, #done-cards" ).sortable();
    $( "#formDate" ).datepicker({
        changeMonth: true,
        changeYear: true
    });
    $('#addTask').on('submit', handleAddTask);
    $('.task-delete-button').on('click', handleDeleteTask)
    $('#todo-cards, #in-progress-cards, #done-cards').on("drop", handleDrop)
});