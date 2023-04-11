/***  user area ***/

const inputElement = document.querySelector("#user-area").querySelector("input");
const addTaskBtn = document.querySelector("#user-area").querySelector(".add-task");
const resetTasksBtn = document.querySelector("#user-area").querySelector(".reset-all");


/*** tasks area ***/

// all kinds of tasks <ul>
const allTasks = document.querySelector(".all-tasks");
const inProgressTasks = document.querySelector(".in-progress");
const completedTasks = document.querySelector(".completed");


// initialize tasks from local storage
let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

// save the local storage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

const displayTasks = () => {
    allTasks.innerHTML = "";
    inProgressTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasksArray.forEach((task) => {

        // create each element
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        const text = document.createElement('span');
        text.innerText = `${task.text}`

        li.appendChild(checkbox);
        li.appendChild(text);

        // manipulating the newly made list in the web page
        if (task.completed) {
            text.classList.add('complete');
            completedTasks.appendChild(li);

        } else if (task.inProgress) {
            inProgressTasks.appendChild(li);

        } else {
            allTasks.appendChild(li);
        }

        // checkbox updation
        checkbox.addEventListener('click', () => {

            if (task.completed) {
                // completed to in-progress
                text.classList.remove('complete')
                task.completed = false;
                task.inProgress = true;

            } else if (task.inProgress) {
                // in-progress to completed
                text.classList.add('complete')
                task.inProgress = false;
                task.completed = true;

            } else {
                // add the tasks in all tasks
                task.inProgress = true;
            }
            
            // save on local storage
            saveTasks();
            
            // display on web page
            displayTasks();
        });
        
    });
    
}

// displaying the already existing tasks
displayTasks();


// Click on 'Add Task' button
addTaskBtn.addEventListener("click", () => {

    let inputVal = inputElement.value.trim();

    if (inputVal === "") {
        alert('Please Input Something 😃')
    }

    // adding tasks in the array
    tasksArray.push({ text: inputVal, inProgress: false, completed: false });

    // save on local storage
    saveTasks();

    // display on web page
    displayTasks();

    // reset the input field
    inputElement.value = "";
});


// Reseting a Task
resetTasksBtn.addEventListener('click', () => {

    // clearing the local storage
    localStorage.clear()
    
    // reloading the browser
    location.reload()
    
})