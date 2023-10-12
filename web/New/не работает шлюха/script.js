function toggleTheme() {
const body = document.body;
body.classList.toggle('dark-theme');
}
const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', () => {
  const input = document.querySelector('input[name="title"]');
  const value = input.value;

  // Открываем файл tasks.html в новой вкладке с параметром task
  const newWindow = window.open(`tasks.html?task=${encodeURIComponent(value)}`, '_blank');
});



function addTaskToTable(taskTitle) {
  // Получаем ссылку на tbody в таблице
  const tableBody = document.querySelector('.tasks tbody');

  // Создаем новую строку
  const newRow = tableBody.insertRow();

  // Создаем ячейку для объединения чекбокса, названия задачи и кнопки удаления
  const combinedCell = newRow.insertCell();
  const combinedCell2 = newRow.insertCell();
  const combinedCell3 = newRow.insertCell();
  // Создаем контейнер для чекбокса, названия задачи и кнопки удаления
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');

  // Создаем чекбокс
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  taskContainer.appendChild(checkbox);

  // Создаем название задачи
  const title = document.createElement('div');
  title.textContent = taskTitle;
  title.classList.add('title-task');
  taskContainer.appendChild(title);

  // Создаем кнопку удаления
  const deleteButton = document.createElement('input');
  deleteButton.type = 'button';
  deleteButton.value = 'Удалить';
  deleteButton.classList.add('delete-button');
  taskContainer.appendChild(deleteButton);

  // Помещаем контейнер в ячейку
  combinedCell.appendChild(taskContainer);

 const deleteButtons = document.querySelectorAll('.delete-button');

// Добавляем обработчик события на каждую кнопку "Удалить"
deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Находим родительскую строку (задачу) и удаляем её
    const taskRow = button.closest('tr');
    taskRow.remove();
  });
});
  // Помещаем контейнер в ячейку
  combinedCell.appendChild(taskContainer);  

  // Сохраняем последнюю задачу в локальное хранилище
  saveLastTaskToLocalStorage(taskTitle);

}

// Функция для загрузки последней задачи из локального хранилища
function loadLastTaskFromLocalStorage() {
  const lastTask = localStorage.getItem('lastTask');

  // Если есть сохраненная задача, добавляем её в таблицу
  if (lastTask) {
    addTaskToTable(lastTask);
  }
}

// При загрузке страницы загружаем последнюю задачу из локального хранилища
window.onload = loadLastTaskFromLocalStorage;


// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const newTask = urlParams.get('task');

// Добавляем задачу, если есть новое задание
if (newTask) {
  addTaskToTable(decodeURIComponent(newTask));
}


