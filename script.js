// References
const input = document.getElementById("inputList");
const button = document.getElementById("btnAdd");
const list = document.getElementById("list");

// Load tasks from LocalStorage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(task => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed;

    const taskText = document.createTextNode(task.text);

    const removeButton = document.createElement('span');
    removeButton.classList.add('del-task');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-x'); 

    removeButton.appendChild(icon);

    li.appendChild(checkbox);
    li.appendChild(taskText);
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
});

// Save tasks to LocalStorage
function saveTasks() {
    const tasks = [];
    list.querySelectorAll('li').forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        const taskText = li.childNodes[1].nodeValue; // Der Text der Aufgabe
        tasks.push({
            text: taskText,
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
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');

        const taskNode = document.createTextNode(taskText);

        const removeButton = document.createElement('span');
        removeButton.classList.add('del-task');
    
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-x'); 
    
        removeButton.appendChild(icon);

        li.appendChild(checkbox);
        li.appendChild(taskNode);
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