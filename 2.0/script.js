// all kinds of tasks arrays
let allTasksList = localStorage.getItem('all-items') ? JSON.parse(localStorage.getItem('all-items')) : []
let inProgressTasksList = localStorage.getItem('in-progress-items') ? JSON.parse(localStorage.getItem('in-progress-items')) : []
let completedList = localStorage.getItem('completed-items') ? JSON.parse(localStorage.getItem('completed-items')) : []


/***  user area ***/

const inputElement = document.querySelector("#user-area").querySelector("input");
const addTaskBtn = document.querySelector("#user-area").querySelector(".add-task");
const resetTasksBtn = document.querySelector("#user-area").querySelector(".reset-all");


/*** tasks area ***/

// all kinds of tasks <ul>
const allTasks = document.querySelector(".all-tasks");
const inProgressTasks = document.querySelector(".in-progress");
const completedTasks = document.querySelector(".completed");


function createTask(taskName) {

    if (!taskName) {
        alert(`Please input something!! 😁`);
        return null;
    }
    else if (allTasksList.indexOf(taskName) > -1) {
        alert(`Sorry, it's already on the list 😞`);
        return null;
    }

    // updating allTaskList
    allTasksList.push(taskName);

    // updating local storage
    localStorage.setItem('all-items', JSON.stringify(allTasksList));

    // adding in html
    const list = document.createElement("li");
    list.classList.add("task");
    list.innerHTML = `<input type="checkbox"><span class="content">${taskName}</span>`;
    allTasks.appendChild(list);
    return list;
}

function allTasksToInProgress(taskName, taskElement) {

    // check if already present of in-progress, if yes, then task should remain in the all tasks section and return true
    if (inProgressTasksList.indexOf(taskName) != -1) {
        alert(`It's already in the in-progress tasks section ☹️`);
        return true;
    }

    // remove from allTasksList
    const idx = allTasksList.indexOf(taskName);
    allTasksList.splice(idx, 1);
    localStorage.setItem('all-items', JSON.stringify(allTasksList));

    // add in-progress list
    inProgressTasksList.push(taskName);
    inProgressTasks.appendChild(taskElement);
    localStorage.setItem('in-progress-items', JSON.stringify(inProgressTasksList));
    return false;
}

function inProgressToCompleted(taskName, checkbox) {

    // in-progress to completed section
    checkbox.nextSibling.style.textDecoration = "line-through";
    checkbox.nextSibling.style.color = "#808080";
    completedList.push(taskName)
    completedTasks.appendChild(checkbox.parentNode);
    localStorage.setItem('completed-items', JSON.stringify(completedList))

    // remove from inProgressTasksList
    const idx = inProgressTasksList.indexOf(taskName);
    inProgressTasksList.splice(idx, 1);
    localStorage.setItem('in-progress-items', JSON.stringify(inProgressTasksList))

}

function completedToInProgress(taskName, checkbox) {
    // check if already present of in-progress
    if (inProgressTasksList.indexOf(taskName) != -1) {
        alert(`It's already in the in-progress tasks section ☹️`);
        checkbox.checked = true;
        return;
    }

    // completed to in-progress section
    checkbox.nextSibling.style.textDecoration = "none";
    checkbox.nextSibling.style.color = "black";

    inProgressTasks.appendChild(checkbox.parentNode);
    inProgressTasksList.push(taskName);
    localStorage.setItem('in-progress-items', JSON.stringify(inProgressTasksList))

    // remove from completedTaskList
    const idx = completedList.indexOf(taskName);
    completedList.splice(idx, 1);
    localStorage.setItem('completed-items', JSON.stringify(completedList));
}

const displayItems = () => {

    // all-tasks section 
    allTasksList.forEach(ele => {
        allTasks.innerHTML += `<li class="task"><input type="checkbox"><span class="content">${ele}</span></li>`

    });

    // in-progress section
    inProgressTasksList.forEach(ele => {
        inProgressTasks.innerHTML += `<li class="task"><input type="checkbox"><span class="content">${ele}</span></li>`

    });

    // completed section
    completedList.forEach(ele => {
        completedTasks.innerHTML += `<li class="task"><input type="checkbox" checked><span class="content complete">${ele}</span></li>`

    });

}

// Click on 'Add Task' button
addTaskBtn.addEventListener("click", () => {

    let inputVal = inputElement.value;

    // adding a task in all tasks section
    const list = createTask(inputVal);

    // reset the input text
    inputElement.value = "";

    // when no task is created
    if (!list) {
        return;
    }

    let isUnderAllTasks = true;
    const checkbox = list.querySelector('input');

    // checkboxes clicking
    checkbox.addEventListener("click", (e) => {

        if (isUnderAllTasks && e.target.checked) {

            // returns the flag if the task remains in the all tasks section or not
            isUnderAllTasks = allTasksToInProgress(inputVal, list);

            // customizing checkbox
            checkbox.checked = false;

        } else if (e.target.checked) {
            inProgressToCompleted(inputVal, checkbox);

        } else {
            completedToInProgress(inputVal, checkbox);

        }

    });

});

// Reseting a Task
resetTasksBtn.addEventListener('click', () => {

    // clearing the local storage
    localStorage.clear()

    // deleting all the arrays
    allTasksList = []
    inProgressTasksList = []
    completedList = []

    // reloading the browser
    location.reload()

})


displayItems();

// checkboxes
const allTasksCheckboxes = allTasks.querySelectorAll('input')
const inProgressTasksCheckboxes = inProgressTasks.querySelectorAll('input')
const completedTasksCheckboxes = completedTasks.querySelectorAll('input')

// already loaded all tasks 
allTasksCheckboxes.forEach(ele => {

    let isUnderAllTasks = true;
    ele.addEventListener('click', () => {

        const list = ele.parentNode;
        const taskName = ele.nextSibling.innerText;

        if (isUnderAllTasks) {
            isUnderAllTasks = allTasksToInProgress(taskName, list);
            ele.checked = false;

        } else if (ele.checked) {
            inProgressToCompleted(taskName, ele);

        } else {
            completedToInProgress(taskName, ele);

        }
    });

});

// already loaded in-progress tasks
inProgressTasksCheckboxes.forEach(ele => {

    ele.addEventListener('click', () => {

        const taskName = ele.nextSibling.innerText;

        if (ele.checked) {
            inProgressToCompleted(taskName, ele);

        } else {
            completedToInProgress(taskName, ele);

        }
    });

});

// already loaded completed tasks
completedTasksCheckboxes.forEach(ele => {

    ele.addEventListener('click', () => {

        const taskName = ele.nextSibling.innerText;

        if (ele.checked) {
            inProgressToCompleted(taskName, ele);

        } else {
            completedToInProgress(taskName, ele);

        }
    });

});