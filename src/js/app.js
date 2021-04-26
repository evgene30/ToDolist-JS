import '../scss/app.scss';

// описываем все переменные
let btn = document.querySelector('#btn'); // кнопка добавить
let inputMsg = document.querySelector('#input'); // поле ввода
let todoBlock = document.querySelector('#todoList'); // отображение блока сообщений
let delForm = document.querySelector('#taskform');
let todoList = []; // массив хранения объектов ввода

// отображение данных из локального хранилища
getLocal();

function getLocal() {
  if (localStorage.getItem('todoList') != undefined) {
    todoList = JSON.parse(localStorage.getItem('todoList')); // получаем данные из хранилища и преобразовывам в массив
    vievTodoList(); // вызываем функцию отображения
  }
}

// создаем функцию для сохраниния данных в локал
function localSave() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// создаем функцию для воода и сохранения значений, и их отображения в теле документа
saveInput();

function saveInput() {

  btn.addEventListener('click', function () {
    if (!inputMsg.value) return; // проверка ввода пустой строки
    let todoMessage = { // объект сообщения
      todo: inputMsg.value,
      checked: false,
      mark: false,
    };
    todoList.unshift(todoMessage); // добавляем объект в массив
    vievTodoList(); // вызываем функцию отображения при клике
    inputMsg.value = ''; // очищаем значение ввода
    localSave(); // вызываем функцию сохранения
    allListens();
  });
}

// визуализируем блок сообщения, добавляем на экран

function vievTodoList() {
  todoBlock.innerHTML = '';

  todoList.forEach(function (item, index) { // перебираем элементы, и добавляем id
    todoBlock.innerHTML += `
      <li tabindex="0" class="main-list__item" id = "${index}"> 
          <div tabindex="-1" class="text ${item.checked ? 'unmarktext' : ''} ${item.mark ? 'text-list__item--active' : ''}"><p>${item.todo}</p></div>
          <div tabindex="-1" class="mark-list__item ${item.mark ? 'mark-list__item--active' : ''}">${item.mark ? 'NOT IMPORTANT' : 'IMPORTANT'}</div>
          <div tabindex="-1" class="del_button" tabindex="9">
          <img src="./images/content/del.svg" title="Delete" alt="delete"></div>
      </li>
      `;
    todoList.innerHTML = todoBlock;
  });
}

allListens();

function allListens() { // функция поиска кликов по всему блоку сообщений
  const listItems = document.querySelectorAll('.main-list__item');
  listItems.forEach(item => { // перебираем клики на кнопках
    delMessage(item); // удаление сообщений
    markText(item); // применение стилей по клику
    unMarkText(item); // перечеркивание сообщения
    activeClick();
  });
}

function delMessage(buttonClick) { // функция удаления сообщений
  buttonClick.querySelector('.del_button').addEventListener('click', function (event) {
    let parentElement = event.target.parentElement.parentElement; //  находим родительский блок для удаления
    let itemIndex = parentElement.getAttribute('id');
    parentElement.remove();
    for (let i = +itemIndex + 1; i < todoList.length; i++) {
      document.getElementById(i).setAttribute('id', i - 1);
    }
    todoList.splice(itemIndex, 1);
    localSave();
  });
}



function markText(buttonClick) { // функция проверки примененныйх стилей по клику (включение,отключение)
  buttonClick.querySelector('.mark-list__item')
    .addEventListener('click', function (item) {
      if (item.target.classList.contains('mark-list__item--active')) { // выполняем проверку по наличию класса на элементе
        item.target.classList.remove('mark-list__item--active');
        item.target.innerHTML = 'IMPORTANT';
        item.target.previousElementSibling.classList.remove('text-list__item--active');
        todoList[item.target.parentElement.id].mark = false;
      } else {
        item.target.classList.add('mark-list__item--active');
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

function siteSearch() { // функция поиска
  document.querySelector('#header__id').oninput = function () {
    const value = this.value.trim(); // значение ввода
    const itemsSerch = document.querySelectorAll('#todoList li');
    if (value !== '') {
      itemsSerch.forEach(function (element) {
        // eslint-disable-next-line eqeqeq
        if (element.innerText.search(value) == -1) {
          element.style.display = 'none'; // убираем не подходящие блоки
        } else {
          element.style.display = 'flex';
        }
      });
    } else {
      itemsSerch.forEach(function (element) {
        element.style.display = 'flex'; // возвращаем обратное значение
      });
    }
  };
}
inputMsg.addEventListener("input", siteSearch); // отфильтровка остаточных значений

activeLink();

function activeLink() { // функция примнения активных стилей ко вкладкам в гланом меню
  let listItem = document.getElementById('list'); // находим список
  let listITems = listItem.getElementsByClassName('nonclick'); // находим ссылки по классу

  for (let i = 0; i < listITems.length; i++) { // перебираем каждую ссылку в цикле
    listITems[i].addEventListener('click', function () {
      let elem = listItem.getElementsByClassName('active'); // находим елемент с активным классом
      elem[0].className = listITems[0].className.replace(' active', '');
      this.className += ' active'; // присваиваем по клику активный класс текущему элементу
    });
  }
}

activeClick();

function activeClick() { // функция применения действий по вкладкам
  let textMark = document.querySelectorAll('.unmarktext');
  let listItems = document.querySelectorAll('.header-nav-menu__link li a'); // находим необходимые ссылки
  let impButtom = document.querySelectorAll('.mark-list__item');

  listItems.forEach((item) => { // перебираем их

    if (item.parentElement.id === 'all') { // проверка по id
      item.addEventListener('click', function () {
        delForm.style.display = 'block';
        impButtom.forEach(function (elem) {
          elem.style.visibility = 'visible';
        });
        textMark.forEach(function (element) {
          element.parentElement.style.display = 'flex';
        });
      });
    }


    if (item.parentElement.id === 'done') {
      item.addEventListener('click', function (elem) {
        delForm.style.display = 'none';
        impButtom.forEach(function (elem) {
          elem.style.visibility = 'hidden'; // скрываем кнопку
        });
        todo.classList.add('unmarktext');
        todo.classList.remove('todo-list--active');
        todo.classList.remove('todo-list--all');


      });
    }


    if (item.parentElement.id === 'active') {
      item.addEventListener('click', function () {
        delForm.style.display = 'block';
        impButtom.forEach(function (elem) {
          elem.style.visibility = 'visible';
        });
        textMark.forEach(function (element) {
          if (element.classList.contains(' unmarktext')) {
            element.parentElement.style.display = 'flex';
          } else {
            element.parentElement.style.display = 'none';
          }
        });
      });
    }
  });
}


