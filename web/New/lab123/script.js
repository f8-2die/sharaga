let dragged;

document.addEventListener("drag", function (event) {
    // Предотвращаем стандартное действие браузера
    event.preventDefault();
}, false);

document.addEventListener("dragstart", function (event) {
    // Сохраняем ячейку, которую мы перетаскиваем
    dragged = event.target;
    // Устанавливаем небольшой прозрачный ободок, чтобы показать, что мы перетаскиваем элемент
    event.target.style.opacity = 0.5;
}, false);

document.addEventListener("dragend", function (event) {
    // Восстанавливаем непрозрачность и убираем ободок после завершения перетаскивания
    event.target.style.opacity = "";
}, false);

document.addEventListener("dragover", function (event) {
    // Предотвращаем стандартное действие браузера
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function (event) {
    // Подсвечиваем целевую ячейку при наведении на нее
    if (event.target.tagName === "TD") {
        event.target.style.background = "lightgray";
    }
}, false);

document.addEventListener("dragleave", function (event) {
    // Убираем подсветку ячейки, когда перетаскиваемый элемент покидает ее
    if (event.target.tagName === "TD") {
        event.target.style.background = "";
    }
}, false);

document.addEventListener("drop", function (event) {
    // Предотвращаем стандартное действие браузера
    event.preventDefault();
    // Убираем подсветку ячейки
    if (event.target.tagName === "TD") {
        event.target.style.background = "";
    }
    // Перемещаем содержимое перетаскиваемой ячейки в целевую ячейку и наоборот
    if (event.target.tagName === "TD" && event.target !== dragged) {
        const draggedContent = dragged.innerHTML;
        dragged.innerHTML = event.target.innerHTML;
        event.target.innerHTML = draggedContent;
        saveTasksToLocalStorage(); // Сохраняем состояние после перемещения
    }
}, false);

function toggleTaskModule() {
    const taskModule = document.getElementById('taskModule');
    taskModule.classList.toggle('hidden');
}

function toggleTaskStatus(checkbox, row) {
    const taskCell = row.querySelector('.taskCell'); // Получаем ячейку с задачей
  
    if (checkbox.checked) {
      taskCell.classList.add('completed'); // Добавляем класс completed для перечеркивания
    } else {
      taskCell.classList.remove('completed'); // Удаляем класс completed
    }
  }

function deleteTask(row) {
    const table = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    table.removeChild(row);
    saveTasksToLocalStorage(); // Сохраняем состояние после удаления задачи
}

function saveTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    if (!taskText) {
        alert('Пожалуйста, введите задачу.');
        return;
    }

    taskInput.value = '';
    toggleTaskModule();

    const tableBody = document.querySelector('#taskTable tbody');

    const newRow = document.createElement('tr');

    // Добавляем ячейку с текстом задачи, чекбоксом и кнопкой "Удалить"
    const cell = document.createElement('td');
    cell.classList.add('taskCell');
    cell.setAttribute('draggable', 'true');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function () {
        toggleTaskStatus(checkbox, newRow);
        saveTasksToLocalStorage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', function () {
        deleteTask(newRow);
    });

    const taskCell = document.createElement('span');
    taskCell.textContent = taskText;

    if (taskText.toLowerCase().includes('в работе')) {
        taskCell.classList.add('inProgress');
    }

    cell.appendChild(checkbox);
    cell.appendChild(taskCell);
    cell.appendChild(deleteButton);

    newRow.appendChild(cell);

    // Добавляем пустые ячейки для остальных столбцов
    for (let i = 0; i < 2; i++) {
        const emptyCell = document.createElement('td');
        newRow.appendChild(emptyCell);
        emptyCell.setAttribute('draggable', 'true');
    }

    tableBody.appendChild(newRow);
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const taskRows = document.querySelectorAll('#taskTable tbody tr');

    const tasks = [];

    taskRows.forEach(row => {
        const taskText = row.querySelector('.taskCell span').textContent;
        const taskStatus = row.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: taskStatus });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const tableBody = document.querySelector('#taskTable tbody');

        const newRow = document.createElement('tr');

        // Добавляем ячейку с текстом задачи, чекбоксом и кнопкой "Удалить"
        const cell = document.createElement('td');
        cell.classList.add('taskCell');
        cell.setAttribute('draggable', 'true');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function () {
            toggleTaskStatus(checkbox, newRow);
            saveTasksToLocalStorage();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', function () {
            deleteTask(newRow);
        });

        const taskCell = document.createElement('span');
        taskCell.textContent = task.text;

        if (task.text.toLowerCase().includes('в работе')) {
            taskCell.classList.add('inProgress');
        }

        cell.appendChild(checkbox);
        cell.appendChild(taskCell);
        cell.appendChild(deleteButton);

        newRow.appendChild(cell);

        // Добавляем пустые ячейки для остальных столбцов
        for (let i = 0; i < 2; i++) {
            const emptyCell = document.createElement('td');
            newRow.appendChild(emptyCell);
            emptyCell.setAttribute('draggable', 'true');
        }

        tableBody.appendChild(newRow);
    });
}

// Загружаем задачи из LocalStorage при загрузке страницы
window.addEventListener('load', function () {
    loadTasksFromLocalStorage();
    // Затем вызовите функцию для перезаполнения таблицы с возможностью перетаскивания
    makeCellsDraggable();
});

// Функция для установки атрибута draggable для всех ячеек
function makeCellsDraggable() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.setAttribute('draggable', 'true');
    });
}

// Вызываем функцию для установки атрибута draggable при загрузке страницы
makeCellsDraggable();
