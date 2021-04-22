import '../scss/app.scss';

// описываем все переменные
const btn = document.querySelector('#btn'); // кнопка
const inputMsg = document.querySelector('#input'); // поле ввода
const todoBlock = document.querySelector('#todoList'); // отображение блока сообщений
let todoList = []; // массив хранения объектов ввода

// вывод данных из локального хранилища
getLocal();

function getLocal() {
  // eslint-disable-next-line no-undef
  if (localStorage.getItem('todoList')) {
    // eslint-disable-next-line no-undef
    todoList = JSON.parse(localStorage.getItem('todoList')); // получаем данные из хранилища и преобразовывам в массив
    vievTodoList(); // вызываем функцию отображения
  }
}

// создаем функцию для хранения данных в локал
function localSave() {
  // eslint-disable-next-line no-undef
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// создаем функцию для воода и сохранения значений, и их отображения в теле документа
saveInput();

function saveInput() {
  btn.addEventListener('click', function () {
    if (inputMsg.value !== '') { // проверка ввода пустой строки
      const todoMessage = { // объект сообщения
        todo: inputMsg.value,
        checked: false,
        mark: false,
      };

      todoList.unshift(todoMessage); // добавляем объект в массив
      localSave(); // вызываем функцию сохранения

      vievTodoList(); // вызываем функцию отображения при клике
      inputMsg.value = ''; // очищаем значение ввода
      // eslint-disable-next-line no-empty
    } else {
      return;
    }
  });
}

// визуализируем блокa сообщений, добавляем весь на экран
function vievTodoList() {
  todoBlock.innerHTML = '';
  todoList.forEach(function (item, index) { // перебираем элементы, и добавляем id
    todoBlock.innerHTML += `
      <li tabindex="0" class="main-list__item" id = "${index}"> 
          <div class="text ${item.checked ? 'unmarktext' : ''} ${item.mark ? 'text-list__item--active' : ''}"><p>${item.todo}</p></div>
          <div class="mark-list__item ${item.mark ? 'mark-list__item--active' : ''}">${item.mark ? 'NOT IMPORTANT' : 'IMPORTANT'}</div>
          <div class="del_button">
          <img src="./images/content/del.svg" title="Delete" alt="delete"></div>
      </li>
      `;
  });
}

allListens();

function allListens() { // функция поиска кликов по всему блоку сообщений
  const listItems = document.querySelectorAll('.main-list__item');

  listItems.forEach((item) => { // перебираем клики на кнопках
    delMessage(item); // удаление сообщений
    markText(item); // применение стилей по клику
    unMarkText(item); // перечеркивание сообщения
  });
}

function delMessage(buttonClick) { // функция удаления сообщений
  buttonClick.querySelector('.del_button')
    .addEventListener('click', function (event) {
      const parentId = event.target.parentElement.parentElement; //  находим родительский блок для удаления
      todoList.splice(parentId.attributes.id.value, 1); // индекс по id для удаления
      parentId.remove();
      // eslint-disable-next-line no-undef
      localSave();
      location.reload();
    });
}

function markText(buttonClick) { // функция проверки примененныйх стилей по клику (включение,отключение)
  buttonClick.querySelector('.mark-list__item')
    .addEventListener('click', function (item) {
      if (item.target.classList.contains('mark-list__item--active')) { // выполняем проверку по наличию класса на элементе
        item.target.classList.remove('mark-list__item--active');
        // eslint-disable-next-line no-param-reassign
        item.target.innerHTML = 'IMPORTANT';
        item.target.previousElementSibling.classList.remove('text-list__item--active');
        todoList[item.target.parentElement.id].mark = false;
      } else {
        item.target.classList.add('mark-list__item--active');
        // eslint-disable-next-line no-param-reassign
        item.target.innerHTML = 'NOT IMPORTANT';
        item.target.previousElementSibling.classList.add('text-list__item--active');
        todoList[item.target.parentElement.id].mark = true;
      }
      localSave();
    });
}

function unMarkText(blockClick) { // функция перечеркивания сообщений при клике по блоку с сообщением
  blockClick.querySelector('.text')
    .addEventListener('click', function (event) {
      if (todoList[event.target.parentElement.id].checked === false) {
        event.target.classList.toggle('unmarktext');
        todoList[event.target.parentElement.id].checked = true;
      } else {
        event.target.classList.remove('unmarktext');
        todoList[event.target.parentElement.id].checked = false;
      }
      localSave();
    });
}

siteSearch();

function siteSearch() {
  // Объявляем переменные
  const input = document.querySelector('#header__id');
  const ul = document.querySelector('#todoList');
  let filter = input.value.toUpperCase();
  let li = ul.getElementsByClassName('main-list__item');

  // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
  for (let item = 0; item < li.length; item++) {
    let a = li[item].getElementsByTagName('a')[0];
    if (a.innerHTML.toUpperCase()
      .indexOf(filter) > -1) {
      li[item].style.display = '';
    } else {
      li[item].style.display = 'none';
    }
  }
}
