import '../scss/app.scss';

// описываем все переменные
const btn = document.querySelector('#btn'); // кнопка добавить
const inputMsg = document.querySelector('#input'); // поле ввода
const todoBlock = document.querySelector('#todoList'); // отображение блока сообщений
let todoList = []; // массив хранения объектов ввода

// отображение данных из локального хранилища
getLocal();

function getLocal() {
  // eslint-disable-next-line no-undef
  if (localStorage.getItem('todoList')) {
    // eslint-disable-next-line no-undef
    todoList = JSON.parse(localStorage.getItem('todoList')); // получаем данные из хранилища и преобразовывам в массив
    vievTodoList(); // вызываем функцию отображения
  }
}

// создаем функцию для сохраниния данных в локал
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
      vievTodoList(); // вызываем функцию отображения при клике
      localSave(); // вызываем функцию сохранения
      inputMsg.value = ''; // очищаем значение ввода
      // eslint-disable-next-line no-empty
    } else {

    }
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

function siteSearch() { // функция поиска
  document.querySelector('#header__id').oninput = function () {
    const value = this.value.trim(); // значение ввода
    const itemsSerch = document.querySelectorAll('#todoList li');
    if (value !== '') {
      itemsSerch.forEach(function (element) {
        // eslint-disable-next-line eqeqeq
        if (element.innerText.search(value) == -1) {
          // eslint-disable-next-line no-param-reassign
          element.style.display = 'none'; // убираем не подходящие блоки
        } else {
          // eslint-disable-next-line no-param-reassign
          element.style.display = 'flex';
        }
      });
    } else {
      itemsSerch.forEach(function (element) {
        // eslint-disable-next-line no-param-reassign
        element.style.display = 'flex'; // возвращаем обратное значение
      });
    }
  };
}

activeLink();

function activeLink() { // функция примнения активных стилей ко вкладкам в гланом меню
  const listItem = document.getElementById('list'); // находим список
  const listITems = listItem.getElementsByClassName('nonclick'); // находим ссылки по классу

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < listITems.length; i++) { // перебираем каждую ссылку в цикле
    listITems[i].addEventListener('click', function () {
      const elem = listItem.getElementsByClassName('active'); // находим елемент с активным классом
      elem[0].className = listITems[0].className.replace(' active', '');
      this.className += ' active'; // присваиваем по клику активный класс текущему элементу
    });
  }
}

activeClick();

function activeClick() { // функция применения действий по вкладкам
  const delForm = document.querySelector('#taskform');
  const textMark = document.querySelectorAll('.unmarktext');
  const listItems = document.querySelectorAll('.header-nav-menu__link li a'); // находим необходимые ссылки
  const impButtom = document.querySelectorAll('.mark-list__item');


  listItems.forEach((item) => { // перебираем их
    // eslint-disable-next-line no-param-reassign
    item.parentElement.style.display = 'flex';
    if (item.parentElement.id === 'all') { // проверка по id
      item.addEventListener('click', function () {
        delForm.style.display = 'block';
        impButtom.forEach(function (elem) {
          // eslint-disable-next-line no-param-reassign
          elem.style.visibility = 'visible';
        });
        textMark.forEach(function (element) {
          element.parentElement.style.display = 'flex';
        });
      });
    }

    if (item.parentElement.id === 'done') {
      item.addEventListener('click', function () {
        delForm.style.display = 'none';
        impButtom.forEach(function (elem) {
          elem.style.visibility = 'hidden';
        });


        textMark.forEach(function (element) {
          if (element.classList.contains(' unmarktext') === false) {
            element.parentElement.style.display = 'flex';
            console.log()
          } else {
            element.parentElement.style.display = 'none';
          }
        });



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
            element.parentElement.style.overflow = 'flex';
          } else {
            element.parentElement.style.display = 'none';
          }
        });
      });
    }
  });
}
