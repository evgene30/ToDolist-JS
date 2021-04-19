import '../scss/app.scss';

// описываем все переменные
let btn = document.querySelector('#btn'); // кнопка
let inputMsg = document.querySelector('#input'); // поле ввода
let todoBlock = document.querySelector('#todoList'); // блок сообщения
let todoList = []; // массив хранения объектов ввода

// проверка данных в локальном хранилище
// eslint-disable-next-line no-undef
if (localStorage.getItem('todoList')) {
  // eslint-disable-next-line no-undef
  todoList = JSON.parse(localStorage.getItem('todoList'));
  vievTodoList(); // вызываем функцию отображения при клике
}

// создаем функцию для объекта хранящего наши значения
btn.addEventListener('click', function () {
  const todoMessage = { // объект сообщения
    todo: inputMsg.value,
    checked: false,
    important: false,
  };

  todoList.unshift(todoMessage); // добавляем объект в массив
  vievTodoList(); // вызываем функцию отображения при клике
  // eslint-disable-next-line no-undef
  localStorage.setItem('todoList', JSON.stringify(todoList)); // переводим строку в JSON
});

// визуализируем блок сообщений, добавляем весь на экран
function vievTodoList() {
  let viewMessage = '';
  for (let item of todoList) {
    let indexId = todoList.indexOf(item);// добавляем id каждому сообщению по индексу элемента

    viewMessage += `
        <li class="main-list__item" id = "${indexId}">
            <div class="text"><p>${item.todo}</p></div>
            <div class="mark-list__item">MARK IMPORTANT</div>
            <div class="del_button" id = "${indexId}">
            <img src="./images/content/del.svg" title="Delete"></div>
        </li>
        `;
    todoBlock.innerHTML = viewMessage;
  }
}

allListens();

function allListens() { // функция поиска кликов по всему блоку сообщений
  let listItems = document.querySelectorAll('.main-list__item');
  listItems.forEach((item) => { // перебираем клики на кнопках
    delMessage(item); // удаление сообщений
    markText(item); // применение стилей по клику
    unMarkText(item); // перечеркивание сообщения
  });
}

function delMessage(buttonClick) { // функция удаления сообщений
  buttonClick.querySelector('.del_button')
    .addEventListener('click', function (event) {
      let parentId = event.target.parentElement.parentElement; //  находим родительский блок для удаления
      todoList.splice(parentId.attributes.id.value, 1); // индекс по id для удаления
      parentId.remove();
      // eslint-disable-next-line no-undef
      localStorage.setItem('todoList', JSON.stringify(todoList));
    });
}

function markText(buttonClick) { // функция проверки примененныйх стилей по клику (включение,отключение)
  buttonClick.querySelector('.mark-list__item')
    .addEventListener('click', function (event) {
      let markItem = event.target;

      if (markItem.classList.contains('mark-list__item--active')) { // выполняем проверку по наличию класса на элементе
        markItem.classList.remove('mark-list__item--active');
        markItem.previousElementSibling.classList.remove('text-list__item--active');
      } else {
        markItem.classList.add('mark-list__item--active');
        markItem.innerHTML = 'NOT IMPORTANT';
        markItem.previousElementSibling.classList.add('text-list__item--active');
      }
    });
}

function unMarkText(blockClick) { // функция перечеркивания сообщений при клике по блоку с сообщением
  blockClick.querySelector('.text')
    .addEventListener('click', function (event) {
      let unMarkItem = event.target;

      if (unMarkItem.classList.contains('unmarktext')) { // выполняем проверку по наличию класса на элементе
        unMarkItem.classList.remove('unmarktext');
      } else {
        unMarkItem.classList.add('unmarktext');
      }
    });

}
