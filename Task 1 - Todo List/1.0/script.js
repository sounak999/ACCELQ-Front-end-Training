const allTasksList = [];
const inProgressTasksList = [];
const inputElement = document
    .querySelector("#user-area")
    .querySelector("input");
const addTaskBtn = document.querySelector("#user-area").querySelector("button");

const allTasks = document.querySelector(".all-tasks");
const inProgressTasks = document.querySelector(".in-progress");
const completedTasks = document.querySelector(".completed");

addTaskBtn.addEventListener("click", () => {
    let inputVal = inputElement.value;

    if (!inputVal) {
        alert(`Please input something!! 🥺`);
        return;
    } else if (allTasksList.indexOf(inputVal) != -1) {
        alert(`It's already in the all tasks section`);
        return;
    }

    allTasksList.push(inputVal);

    // adding the task
    const list = document.createElement("li");
    list.classList.add("task");
    list.innerHTML = `<input type="checkbox"><span class="content">${inputVal}</span>`;
    allTasks.appendChild(list);

    // reset the input text
    inputElement.value = "";

    const checkbox = list.querySelector('input[type="checkbox"]');
    let isUnderAllTasks = true;
    checkbox.addEventListener("click", (e) => {
        if (isUnderAllTasks && e.target.checked) {
            // customizing checkbox
            checkbox.checked = false;
            isUnderAllTasks = false;

            // remove from allTasksList
            const idx = allTasksList.indexOf(inputVal);
            if (idx > -1) {
                allTasksList.splice(idx, 1);
            }

            // add in-progress list
            if (inProgressTasksList.indexOf(inputVal) != -1) {
                alert(`It's already in the in-progress tasks section ☹️`);
                return;
            } else {
                inProgressTasks.appendChild(list);
                inProgressTasksList.push(inputVal);
            }
        } else if (e.target.checked) {
            // in-progress to completed section
            checkbox.nextSibling.style.textDecoration = "line-through";
            checkbox.nextSibling.style.color = "grey";
            completedTasks.appendChild(list);

            // remove from inProgressTasksList
            const idx = inProgressTasksList.indexOf(inputVal);
            if (idx > -1) {
                inProgressTasksList.splice(idx, 1);
            }
        } else {
            // completed to in-progress section
            checkbox.nextSibling.style.textDecoration = "none";
            checkbox.nextSibling.style.color = "black";
            inProgressTasks.appendChild(list);
            inProgressTasksList.push(inputVal);
        }

        console.log("In Progress Tasks", inProgressTasksList);
    });

    console.log("All Tasks Section", allTasksList);
});
