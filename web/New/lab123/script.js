function secondFileFunction(value) {
  // Получаем ссылку на tbody в таблице
  const tableBody = document.querySelector('.tasks tbody');
  
  // Создаем новую строку
  const newRow = tableBody.insertRow();

  // Создаем ячейку и добавляем значение в неё
  const newCell = newRow.insertCell();
  newCell.textContent = value;
}
