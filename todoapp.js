document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = {
            text: taskText,
            completed: false,
            date: new Date().toLocaleString()
        };
        createTaskElement(task);
        taskInput.value = '';
    }
}

function createTaskElement(task) {
    const taskList = task.completed ? document.getElementById('completed-tasks') : document.getElementById('pending-tasks');
    const taskItem = document.createElement('li');
    
    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (Added on: ${task.date})`;
    
    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');
    
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => toggleComplete(task, taskItem));
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => editTask(task, taskItem));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(taskItem));
    
    taskButtons.appendChild(completeBtn);
    taskButtons.appendChild(editBtn);
    taskButtons.appendChild(deleteBtn);
    
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskButtons);
    
    taskList.appendChild(taskItem);
}

function toggleComplete(task, taskItem) {
    task.completed = !task.completed;
    taskItem.remove();
    createTaskElement(task);
}

function editTask(task, taskItem) {
    const newTaskText = prompt('Edit your task:', task.text);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        task.text = newTaskText.trim();
        taskItem.remove();
        createTaskElement(task);
    }
}

function deleteTask(taskItem) {
    taskItem.remove();
}
