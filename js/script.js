document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const submitBtn = document.getElementById('submit-btn');
    const updateBtn = document.getElementById('update-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentEditId = null;

    // Save tasks to LocalStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Format Date
    const getCurrentDate = () => {
        const now = new Date();
        return now.toLocaleString();
    };

    // Add Task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            date: getCurrentDate()
        };

        tasks.push(newTask);
        taskInput.value = '';
        saveTasks();
    };

    // Prepare Edit Mode
    window.editTask = (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        taskInput.value = task.text;
        currentEditId = id;

        // Toggle Buttons
        submitBtn.style.display = 'none';
        updateBtn.style.display = 'block';

        taskInput.focus();
    };

    // Update Task
    const updateTask = () => {
        if (!currentEditId) return;

        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Task cannot be empty!');
            return;
        }

        const taskIndex = tasks.findIndex(t => t.id === currentEditId);
        if (taskIndex !== -1) {
            tasks[taskIndex].text = taskText;
            tasks[taskIndex].date = getCurrentDate(); // Update date on edit
            saveTasks();
        }

        // Reset UI
        taskInput.value = '';
        currentEditId = null;
        submitBtn.style.display = 'block';
        updateBtn.style.display = 'none';
    };

    // Delete Single Task
    window.deleteTask = (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== id);

            // If we deleted the task being edited, reset the form
            if (id === currentEditId) {
                taskInput.value = '';
                currentEditId = null;
                submitBtn.style.display = 'block';
                updateBtn.style.display = 'none';
            }

            saveTasks();
        }
    };

    // Delete All Tasks
    const clearAllTasks = () => {
        if (confirm('Are you sure you want to delete all tasks?')) {
            tasks = [];
            taskInput.value = '';
            currentEditId = null;
            submitBtn.style.display = 'block';
            updateBtn.style.display = 'none';
            saveTasks();
        }
    };

    // Move Up
    window.moveUp = (index) => {
        if (index > 0) {
            [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
            saveTasks();
        }
    };

    // Move Down
    window.moveDown = (index) => {
        if (index < tasks.length - 1) {
            [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
            saveTasks();
        }
    };

    // Render Tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');

            // Highlight the row if it's being edited
            if (task.id === currentEditId) {
                row.style.backgroundColor = 'rgba(255, 165, 0, 0.2)';
            }

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${task.text}</td>
                <td>${task.date}</td>
                <td class="btn-group">
                    <button class="action-btn edit-btn" onclick="editTask(${task.id})">Edit</button>
                    <button class="action-btn del-btn" onclick="deleteTask(${task.id})">Del</button>
                    <button class="action-btn up-btn" onclick="moveUp(${index})">Up</button>
                    <button class="action-btn down-btn" onclick="moveDown(${index})">Down</button>
                </td>
            `;

            taskList.appendChild(row);
        });
    };

    // Event Listeners
    submitBtn.addEventListener('click', addTask);
    updateBtn.addEventListener('click', updateTask);
    clearAllBtn.addEventListener('click', clearAllTasks);

    // Allow Enter key to submit or update
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (currentEditId) {
                updateTask();
            } else {
                addTask();
            }
        }
    });

    // Initial Render
    renderTasks();
});
