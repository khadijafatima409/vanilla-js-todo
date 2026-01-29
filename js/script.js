document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const submitBtn = document.getElementById('submit-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Save tasks to LocalStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Format Date
    const getCurrentDate = () => {
        const now = new Date();
        return now.toLocaleString(); // Example: "1/29/2026, 7:00:00 PM"
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

    // Delete Single Task
    window.deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
    };

    // Delete All Tasks
    const clearAllTasks = () => {
        if (confirm('Are you sure you want to delete all tasks?')) {
            tasks = [];
            saveTasks();
        }
    };

    // Edit Task
    window.editTask = (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const newText = prompt('Update Task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            task.date = getCurrentDate(); // Update date on edit
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
    clearAllBtn.addEventListener('click', clearAllTasks);

    // Allow Enter key to submit
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial Render
    renderTasks();
});
