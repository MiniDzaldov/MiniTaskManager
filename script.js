document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = document.createElement('li');

            const taskTextSpan = document.createElement('span');
            taskTextSpan.textContent = taskText;

            const editButton = document.createElement('button');
            editButton.innerHTML = '&#9998;'; // Edit icon (Unicode pencil)
            editButton.addEventListener('click', () => {
                const newTaskText = prompt('Edit your task:', taskTextSpan.textContent);
                if (newTaskText !== null) {
                    taskTextSpan.textContent = newTaskText.trim();
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '&#128465;'; // Delete icon (Unicode trash can)
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(taskItem);
            });

            taskItem.appendChild(taskTextSpan);
            taskItem.appendChild(editButton);
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);

            taskInput.value = '';
        }
    });
});