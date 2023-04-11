// all kinds of tasks arrays
let allTasksList = localStorage.getItem("all-items")
    ? JSON.parse(localStorage.getItem("all-items"))
    : [];
let inProgressTasksList = localStorage.getItem("in-progress-items")
    ? JSON.parse(localStorage.getItem("in-progress-items"))
    : [];
let completedList = localStorage.getItem("completed-items")
    ? JSON.parse(localStorage.getItem("completed-items"))
    : [];

/***  user area ***/

const inputElement = document
    .querySelector("#user-area")
    .querySelector("input");
const addTaskBtn = document
    .querySelector("#user-area")
    .querySelector(".add-task");
const resetTasksBtn = document
    .querySelector("#user-area")
    .querySelector(".reset-all");

/*** tasks area ***/

// all kinds of tasks <ul>
const allTasks = document.querySelector(".all-tasks");
const inProgressTasks = document.querySelector(".in-progress");
const completedTasks = document.querySelector(".completed");

function createTask(taskName) {
    if (!taskName) {
        alert(`Please input something!! 😁`);
        return;
    } else if (allTasksList.indexOf(taskName) > -1) {
        alert(`Sorry, it's already on the list 😞`);
        return;
    }

    // updating allTaskList
    allTasksList.push(taskName);

    // updating local storage
    localStorage.setItem("all-items", JSON.stringify(allTasksList));

    // adding in html
    const list = document.createElement("li");
    list.classList.add("task");
    list.innerHTML = `<input type="checkbox"><span class="content">${taskName}</span>`;
    allTasks.appendChild(list);
}

function allTasksToInProgress(taskName, checkbox) {
    // check if already present of in-progress, if yes, then task should remain in the all tasks section and return true
    checkbox.checked = false;
    if (inProgressTasksList.indexOf(taskName) != -1) {
        alert(`It's already in the in-progress tasks section ☹️`);
        return;
    }

    // remove from allTasksList
    const idx = allTasksList.indexOf(taskName);
    allTasksList.splice(idx, 1);
    localStorage.setItem("all-items", JSON.stringify(allTasksList));

    // add in-progress list
    inProgressTasksList.push(taskName);
    inProgressTasks.appendChild(checkbox.parentNode);
    localStorage.setItem(
        "in-progress-items",
        JSON.stringify(inProgressTasksList)
    );
}

function inProgressToCompleted(taskName, checkbox) {
    // in-progress to completed section
    checkbox.nextSibling.style.textDecoration = "line-through";
    checkbox.nextSibling.style.color = "#808080";
    completedList.push(taskName);
    completedTasks.appendChild(checkbox.parentNode);
    localStorage.setItem("completed-items", JSON.stringify(completedList));

    // remove from inProgressTasksList
    const idx = inProgressTasksList.indexOf(taskName);
    inProgressTasksList.splice(idx, 1);
    localStorage.setItem(
        "in-progress-items",
        JSON.stringify(inProgressTasksList)
    );
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
    localStorage.setItem(
        "in-progress-items",
        JSON.stringify(inProgressTasksList)
    );

    // remove from completedTaskList
    const idx = completedList.indexOf(taskName);
    completedList.splice(idx, 1);
    localStorage.setItem("completed-items", JSON.stringify(completedList));
}

const displayItems = () => {
    // all-tasks section
    allTasksList.forEach((ele) => {
        allTasks.innerHTML += `<li class="task"><input type="checkbox"><span class="content">${ele}</span></li>`;
    });

    // in-progress section
    inProgressTasksList.forEach((ele) => {
        inProgressTasks.innerHTML += `<li class="task"><input type="checkbox"><span class="content">${ele}</span></li>`;
    });

    // completed section
    completedList.forEach((ele) => {
        completedTasks.innerHTML += `<li class="task"><input type="checkbox" checked><span class="content complete">${ele}</span></li>`;
    });
};

// Click on 'Add Task' button
addTaskBtn.addEventListener("click", () => {
    let inputVal = inputElement.value;

    // adding a task in all tasks section
    // const list = createTask(inputVal);
    createTask(inputVal);

    // reset the input text
    inputElement.value = "";

});

// Reseting a Task
resetTasksBtn.addEventListener("click", () => {
    // clearing the local storage
    localStorage.clear();

    // deleting all the arrays
    allTasksList = [];
    inProgressTasksList = [];
    completedList = [];

    // reloading the browser
    location.reload();
});

displayItems();

allTasks.addEventListener("click", (e) => {
    const checkbox = e.target;

    if (checkbox.tagName == "INPUT" && checkbox.type == "checkbox") {
        const taskName = checkbox.nextSibling.innerText;
        allTasksToInProgress(taskName, checkbox);
    }
});

inProgressTasks.addEventListener("click", (e) => {
    const checkbox = e.target;

    if (checkbox.tagName == "INPUT" && checkbox.type == "checkbox") {
        const taskName = checkbox.nextSibling.innerText;
        inProgressToCompleted(taskName, checkbox);
    }
});

completedTasks.addEventListener("click", (e) => {
    const checkbox = e.target;

    if (checkbox.tagName == "INPUT" && checkbox.type == "checkbox") {
        const taskName = checkbox.nextSibling.innerText;
        completedToInProgress(taskName, checkbox);
    }
});
