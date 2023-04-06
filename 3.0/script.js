const allTasksList = document.getElementById("all-tasks");
const inProgressList = document.getElementById("in-progress");
const completedList = document.getElementById("completed");
const newTaskInput = document.getElementById("new-task-input");
const addTaskButton = document.getElementById("add-task-button");

// initialize tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// function to save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function to render tasks to the appropriate list
function renderTasks() {
    allTasksList.innerHTML = "";
    inProgressList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        const text = document.createTextNode(task.text);

        li.appendChild(checkbox);
        li.appendChild(text);

        if (task.completed) {
            li.classList.add("completed");
            completedList.appendChild(li);
        } else if (task.inProgress) {
            li.classList.add("in-progress");
            inProgressList.appendChild(li);
        } else {
            allTasksList.appendChild(li);
        }

        // add event listener to checkbox to update task status
        checkbox.addEventListener("click", function () {
            if (task.completed) {
                task.completed = false;
                task.inProgress = true;
            } else if (task.inProgress) {
                task.inProgress = false;
                task.completed = true;
            } else {
                task.inProgress = true;
            }

            saveTasks();
            renderTasks();
        });
    });
}

// render tasks on page load
renderTasks();

// add task when add task button is clicked
addTaskButton.addEventListener("click", function () {
    const text = newTaskInput.value.trim();

    if (text !== "") {
        tasks.push({ text: text, inProgress: false, completed: false });
        saveTasks();
        renderTasks();
        newTaskInput.value = "";
    }
});
