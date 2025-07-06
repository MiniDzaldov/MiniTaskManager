document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    
    // Modal elements
    const editModal = document.getElementById('edit-modal');
    const editInput = document.getElementById('edit-input');
    const saveEditButton = document.getElementById('save-edit');
    const cancelEditButton = document.getElementById('cancel-edit');
    let currentSpanBeingEdited = null;

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = document.createElement('li');

            const taskTextSpan = document.createElement('span');
            taskTextSpan.textContent = taskText;

            // Create container for icons
            const buttonContainer = document.createElement('div');

            // Edit button with icon (Unicode pencil)
            const editButton = document.createElement('button');
            editButton.innerHTML = '&#9998;';
            editButton.addEventListener('click', () => {
                currentSpanBeingEdited = taskTextSpan;
                editInput.value = taskTextSpan.textContent;
                editModal.style.display = "flex";
            });

            // Delete button with icon (Unicode trash can)
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '&#128465;';
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(taskItem);
            });

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);

            taskItem.appendChild(taskTextSpan);
            taskItem.appendChild(buttonContainer);
            taskList.appendChild(taskItem);

            taskInput.value = '';
        }
    });

    // Save changes from modal
    saveEditButton.addEventListener('click', () => {
      if (currentSpanBeingEdited) {
         currentSpanBeingEdited.textContent = editInput.value.trim();
      }
      editModal.style.display = 'none';
    });

    // Cancel modal edit
    cancelEditButton.addEventListener('click', () => {
         editModal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
         if (e.target === editModal) {
              editModal.style.display = 'none';
         }
    });
});