document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const newTaskInput = document.getElementById('newTask');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskListTableBody = document.querySelector('#taskList tbody');
        const emptyMessage = document.getElementById('emptyMessage');
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const appContainer = document.querySelector('.app-container');
        const inputLabel = document.querySelector('.input-group label');
        const taskInput = document.getElementById('newTask');
        const addButton = document.querySelector('.add-button');
        const taskListHeading = document.querySelector('.task-list-section h2');
        const tableWrapper = document.querySelector('.table-wrapper');
        const taskTable = document.getElementById('taskList');
        const appFooter = document.querySelector('.app-footer');
        const footerLinks = document.querySelectorAll('.app-footer a');

        const enableDarkMode = () => {
            body.classList.add('dark-theme');
            appContainer.classList.add('dark-theme');
            inputLabel.classList.add('dark-theme');
            taskInput.classList.add('dark-theme');
            addButton.classList.add('dark-theme');
            taskListHeading.classList.add('dark-theme');
            tableWrapper.classList.add('dark-theme');
            taskTable.classList.add('dark-theme');
            appFooter.classList.add('dark-theme');
            footerLinks.forEach(link => link.classList.add('dark-theme'));
            localStorage.setItem('theme', 'dark');
        };

        const enableLightMode = () => {
            body.classList.remove('dark-theme');
            appContainer.classList.remove('dark-theme');
            inputLabel.classList.remove('dark-theme');
            taskInput.classList.remove('dark-theme');
            addButton.classList.remove('dark-theme');
            taskListHeading.classList.remove('dark-theme');
            tableWrapper.classList.remove('dark-theme');
            taskTable.classList.remove('dark-theme');
            appFooter.classList.remove('dark-theme');
            footerLinks.forEach(link => link.classList.remove('dark-theme'));
            localStorage.setItem('theme', 'light');
        };

        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            enableDarkMode();
        }

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                enableLightMode();
            } else {
                enableDarkMode();
            }
        });

        let tasks = [];

        function renderTasks() {
            taskListTableBody.innerHTML = '';
            if (tasks.length === 0) {
                emptyMessage.style.display = 'block';
            } else {
                emptyMessage.style.display = 'none';
                tasks.forEach((task, index) => {
                    const row = taskListTableBody.insertRow();

                    const numberCell = row.insertCell();
                    numberCell.textContent = index + 1;
                    numberCell.style.textAlign = 'center';

                    const taskCell = row.insertCell();
                    taskCell.textContent = task;

                    const actionsCell = row.insertCell();
                    actionsCell.classList.add('actions');
                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('delete-btn');
                    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar';
                    deleteButton.addEventListener('click', () => deleteTask(index));
                    actionsCell.appendChild(deleteButton);
                });
            }
        }

        function addTask() {
            const taskText = newTaskInput.value.trim();
            if (taskText !== '') {
                tasks.push(taskText);
                renderTasks();
                newTaskInput.value = '';
            }
        }
        function deleteTask(index) {
            tasks.splice(index, 1);
            renderTasks();
        }
        addTaskBtn.addEventListener('click', addTask);

        newTaskInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addTask();
            }
        });

        renderTasks();
    }, 0);
});
