document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const taskPriority = document.getElementById('task-priority');
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    const editModal = document.getElementById('editModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const editForm = document.getElementById('edit-form');
    const editTaskInput = document.getElementById('edit-task-input');
    const editTaskDate = document.getElementById('edit-task-date');
    const editTaskPriority = document.getElementById('edit-task-priority');
    const sortTasksSelect = document.getElementById('sort-tasks');
    let editTaskId = null;
    let tasks = [];

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const task = {
            text: taskInput.value,
            date: taskDate.value,
            priority: taskPriority.value,
            completed: false
        };
        addTask(task);
        taskInput.value = '';
        taskDate.value = '';
        taskPriority.value = 'low';
    });

    pendingTasksList.addEventListener('click', handleTaskActions);
    completedTasksList.addEventListener('click', handleTaskActions);

    closeModal.onclick = function() {
        editModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
    }

    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const updatedTask = {
            text: editTaskInput.value,
            date: editTaskDate.value,
            priority: editTaskPriority.value
        };
        updateTask(editTaskId, updatedTask);
        editModal.style.display = 'none';
    });

    sortTasksSelect.addEventListener('change', function() {
        renderTasks(tasks);
    });

    function handleTaskActions(e) {
        const id = e.target.closest('li').getAttribute('data-id');
        if (e.target.classList.contains('delete-btn')) {
            deleteTask(id);
        } else if (e.target.classList.contains('edit-btn')) {
            editTaskId = id;
            getTask(id).then(task => {
                editTaskInput.value = task.text;
                editTaskDate.value = task.date;
                editTaskPriority.value = task.priority;
                editModal.style.display = 'flex';
            });
        } else if (e.target.classList.contains('complete-btn')) {
            toggleTask(id);
        }
    }

    function addTask(task) {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(data => {
            tasks = data.tasks;
            renderTasks(tasks);
        });
    }

    function deleteTask(id) {
        fetch(`/tasks/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            tasks = data.tasks;
            renderTasks(tasks);
        });
    }

    function toggleTask(id) {
        fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: true })
        })
        .then(response => response.json())
        .then(data => {
            tasks = data.tasks;
            renderTasks(tasks);
        });
    }

    function updateTask(id, task) {
        fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(data => {
            tasks = data.tasks;
            renderTasks(tasks);
        });
    }

    function getTask(id) {
        return fetch(`/tasks/${id}`)
            .then(response => response.json())
            .then(data => data.task);
    }

    function renderTasks(taskList) {
        pendingTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';

        // Sort tasks based on the selected option
        const sortBy = sortTasksSelect.value;
        const sortedTasks = taskList.slice().sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(a.date) - new Date(b.date);
            } else if (sortBy === 'priority') {
                const priorities = { low: 1, medium: 2, high: 3 };
                return priorities[b.priority] - priorities[a.priority]; // 反轉比較順序
            }
            return 0;
        });        

        sortedTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.text} (Due: ${task.date}, Priority: ${task.priority})`;
            li.setAttribute('data-id', task.id);
            if (task.completed) {
                li.classList.add('completed');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-btn');
                li.appendChild(deleteButton);
                completedTasksList.appendChild(li);
            } else {
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Complete';
                completeButton.classList.add('complete-btn');
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('edit-btn');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-btn');
                const taskButtons = document.createElement('div');
                taskButtons.classList.add('task-buttons');
                taskButtons.appendChild(completeButton);
                taskButtons.appendChild(editButton);
                taskButtons.appendChild(deleteButton);
                li.appendChild(taskButtons);
                pendingTasksList.appendChild(li);
            }
        });
    }

    fetch('/tasks')
    .then(response => response.json())
    .then(data => {
        tasks = data.tasks;
        renderTasks(tasks);
    });
});
