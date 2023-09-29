var input = document.getElementById("employee-name");
var inputNum = document.getElementById("employee-number");
var button = document.getElementById("submit-number");
var deleteLinks = document.querySelectorAll("table a[href='#Delete']");

input.value = "например, Gosling";

input.addEventListener("focus", function() {
  if (input.value == "например, Gosling") {
    input.value = "";
  }
});

input.addEventListener("blur", function() {
  if (input.value == "") {
    input.value = "например, Gosling";
  }
});

button.addEventListener("click", function() {
  var value = inputNum.value;
  if (isNaN(value)) {
    alert("Введите число");
  }
});
var deleteLinks = document.querySelectorAll("table a[href='#Delete']");

for (var i = 0; i < deleteLinks.length; i++) {
  deleteLinks[i].addEventListener("click", function(event) {
    event.preventDefault();
    var row = this.parentNode.parentNode;
    var confirmDelete = confirm("Вы уверены, что хотите удалить этого сотрудника?");
    if (confirmDelete) {
      row.parentNode.removeChild(row);
    }
  });
}

var deleteLink = document.querySelectorAll("table a[href='#DonDon']");
for (var i = 0; i < deleteLink.length; i++) {
  deleteLink[i].addEventListener("click", function(event) {
    event.preventDefault();
    var modal = document.createElement("div");
    modal.innerHTML = "<p>Отряд чеченцев в 300 метров от вас. Извиниться?</p><button id='yes'>Да</button><button id='no'>Нет</button>";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.backgroundColor = "white";
    modal.style.padding = "20px";
    modal.style.borderRadius = "5px";
    modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    document.body.appendChild(modal);
    document.getElementById("yes").addEventListener("click", function() {
      alert("Хочу извиниться лично перед Рамзаном Ахматовичем и всем чеченским народом, я не хотел вас увольнять!");
      document.body.removeChild(modal);
    });
    document.getElementById("no").addEventListener("click", function() {
      alert("Вы разочаровали Дона. Ваше текущее местоположение уже установлено.");
      document.body.removeChild(modal);
    });
  });
}





