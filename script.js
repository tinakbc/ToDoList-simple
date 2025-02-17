// References
const input = document.getElementById("inputList");
const button = document.getElementById("btnAdd");
const list = document.getElementById("list");

// Load tasks from LocalStorage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(task => {
    const li = document.createElement('li');
    const spanTask = document.createElement('span');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed;

    spanTask.textContent = task.text;

    const editButton = document.createElement('span');
    editButton.classList.add('edit-task');

    const iconEdit = document.createElement('i');
    iconEdit.classList.add('fa-solid', 'fa-pencil');

    const removeButton = document.createElement('span');
    removeButton.classList.add('del-task');

    const iconX = document.createElement('i');
    iconX.classList.add('fa-solid', 'fa-x');

    editButton.appendChild(iconEdit);
    removeButton.appendChild(iconX);

    li.appendChild(checkbox);
    li.appendChild(spanTask);
    li.appendChild(editButton);
    li.appendChild(removeButton);
    list.appendChild(li);

    // Save line-through when re-loading
    if (task.completed) {
        li.style.textDecoration = 'line-through';
    }
    // Checkbox-Eventlistener
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            li.style.textDecoration = 'line-through';
        } else {
            li.style.textDecoration = 'none';
        }
        saveTasks();
    });

    // Remove-Button-Eventlistener
    removeButton.addEventListener('click', function () {
        li.remove();
        saveTasks();
    });

    // Edit Button Eventlistener
    editButton.addEventListener('click', function () {
        editTask(spanTask, li);
    });
});

// Edit task function
function editTask(spanTask, li) {
    const newInputField = document.createElement('input');
    newInputField.classList.add('newInputField');

    newInputField.value = spanTask.textContent;
    spanTask.replaceWith(newInputField);

    // Save edit via Enter
    newInputField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            spanTask.textContent = newInputField.value;
            newInputField.replaceWith(spanTask);

            saveTasks();
        }
    });
}


// Save tasks to LocalStorage
function saveTasks() {
    const tasks = [];
    list.querySelectorAll('li').forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        const spanTask = li.querySelector('span').textContent;
        tasks.push({
            text: spanTask,
            completed: checkbox.checked,
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
function addTask() {
    const taskText = input.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        const spanTask = document.createElement('span');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');

        spanTask.textContent = taskText;

        const editButton = document.createElement('span');
        editButton.classList.add('edit-task');

        const iconEdit = document.createElement('i');
        iconEdit.classList.add('fa-solid', 'fa-pencil');

        const removeButton = document.createElement('span');
        removeButton.classList.add('del-task');

        const iconX = document.createElement('i');
        iconX.classList.add('fa-solid', 'fa-x');

        editButton.appendChild(iconEdit);
        removeButton.appendChild(iconX);

        li.appendChild(checkbox);
        li.appendChild(spanTask);
        li.appendChild(editButton);
        li.appendChild(removeButton);
        list.appendChild(li);

        input.value = '';

        // Checkbox-Eventlistener
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                li.style.textDecoration = 'line-through';
            } else {
                li.style.textDecoration = 'none';
            }
            saveTasks();
        });

        // Remove-Button-Eventlistener
        removeButton.addEventListener('click', function () {
            li.remove();
            saveTasks();
        });

        saveTasks();
    }

    // Edit Button Eventlistener
    editButton.addEventListener('click', function () {
        editTask(spanTask, li);
    });


}

// Add task via button click
button.addEventListener('click', addTask);


// Add task via Enter key
input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});
