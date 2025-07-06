document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search-task');

    // Modal elements
    const editModal = document.getElementById('edit-modal');
    const editInput = document.getElementById('edit-input');
    const saveEditButton = document.getElementById('save-edit');
    const cancelEditButton = document.getElementById('cancel-edit');
    let currentSpanBeingEdited = null;

    // Array to keep tasks in memory
    let tasks = [];

    // Load tasks from localStorage on page load
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            tasks.forEach(task => addTaskToDOM(task));
        }
    }

    // Save current tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a task element and append to DOM
    function addTaskToDOM(task) {
        const taskItem = document.createElement('li');
        taskItem.dataset.id = task.id;

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;

        // Create container for icon buttons
        const buttonContainer = document.createElement('div');

        // Edit button with icon (Unicode pencil)
        const editButton = document.createElement('button');
        editButton.innerHTML = '&#9998;';
        editButton.addEventListener('click', () => {
            currentSpanBeingEdited = taskTextSpan;
            editInput.value = task.text;
            editModal.style.display = "flex";
        });

        // Delete button with icon (Unicode trash can)
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#128465;';
        deleteButton.addEventListener('click', () => {
            if (window.confirm('Are you sure you want to delete this task?')) {
                taskList.removeChild(taskItem);
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
            }
        });

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(buttonContainer);
        taskList.appendChild(taskItem);
    }

    // Add New Task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = { id: Date.now().toString(), text: taskText };
            tasks.push(task);
            saveTasks();
            addTaskToDOM(task);
            taskInput.value = '';
        }
    });

    // Search tasks: filter visible tasks based on search query
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const taskItems = taskList.getElementsByTagName('li');
        Array.from(taskItems).forEach(taskItem => {
            const taskText = taskItem.querySelector('span').textContent.toLowerCase();
            taskItem.style.display = taskText.includes(query) ? '' : 'none';
        });
    });

    // Save changes from the modal (edit task)
    saveEditButton.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (currentSpanBeingEdited) {
            currentSpanBeingEdited.textContent = newText;
            // Update task in tasks array using the parent li's dataset id
            const taskItem = currentSpanBeingEdited.parentElement;
            const taskId = taskItem.dataset.id;
            tasks = tasks.map(t => {
                if (t.id === taskId) {
                    return { ...t, text: newText };
                }
                return t;
            });
            saveTasks();
        }
        editModal.style.display = 'none';
    });

    // Cancel modal edit
    cancelEditButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Close modal when clicking outside modal content
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Load saved tasks after DOM loads
    loadTasks();
});