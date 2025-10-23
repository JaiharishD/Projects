document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render initial tasks
    renderTasks();

    // Add task event listener
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task;
            
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => editTask(index);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteTask(index);
            
            li.appendChild(taskText);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function editTask(index) {
        const taskElements = document.querySelectorAll('.task-item');
        const taskElement = taskElements[index];
        const taskText = taskElement.querySelector('.task-text');
        const currentText = taskText.textContent;

        // Create input for editing
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'task-text editable';

        // Replace text with input
        taskText.replaceWith(input);
        input.focus();

        // Handle edit completion
        input.addEventListener('blur', completeEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                input.removeEventListener('blur', completeEdit);
                completeEdit();
            }
        });

        function completeEdit() {
            const newText = input.value.trim();
            if (newText) {
                tasks[index] = newText;
                saveTasks();
            }
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
