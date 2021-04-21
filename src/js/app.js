import '../scss/app.scss';

// описываем все переменные
let btn = document.querySelector('#btn'); // кнопка
let inputMsg = document.querySelector('#input'); // поле ввода
let todoBlock = document.querySelector('#todoList'); // отображение блока сообщений
let todoList = []; // массив хранения объектов ввода



// вывод данных из локального хранилища
getLocal();

function getLocal() {
  if (localStorage.getItem('todoList')) {
    // eslint-disable-next-line no-undef
    todoList = JSON.parse(localStorage.getItem('todoList')); // получаем данные из хранилища и преобразовывам в массив
    vievTodoList(); // вызываем функцию отображения
  }
}


// создаем функцию для хранения данных в локал
function localSave() {
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
        important: false,
      }

      todoList.unshift(todoMessage); // добавляем объект в массив
      vievTodoList(); // вызываем функцию отображения при клике
      localSave();  // вызываем функцию сохранения
      inputMsg.value = ''; //очищаем значение ввода
    } else {
      return
    };

  });
}


// визуализируем блокa сообщений, добавляем весь на экран
function vievTodoList() {
  todoBlock.innerHTML = '';
  todoList.forEach(function (item, index) { // перебираем элементы, и добавляем id 

    let checkTudo = todoList.value;


    todoBlock.innerHTML += `
      <li class="main-list__item" id = "${index}"> 
          <div class="text"><p>${item.todo}</p></div>
          <div class="mark-list__item">MARK IMPORTANT</div>
          <div class="del_button">
          <img src="./images/content/del.svg" title="Delete"></div>
      </li>
      `;
  });
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
  buttonClick.querySelector('.del_button').addEventListener('click', function (event) {
    let parentId = event.target.parentElement.parentElement; //  находим родительский блок для удаления
    todoList.splice(parentId.attributes.id.value, 1); // индекс по id для удаления
    parentId.remove();
    // eslint-disable-next-line no-undef
    localSave();

  });
}

function markText(buttonClick) { // функция проверки примененныйх стилей по клику (включение,отключение)
  buttonClick.querySelector('.mark-list__item').addEventListener('click', function (event) {
    let markItem = event.target;
    let idElement = markItem.parentElement.id;


    if (markItem.classList.contains('mark-list__item--active')) { // выполняем проверку по наличию класса на элементе
      markItem.classList.remove('mark-list__item--active');
      markItem.innerHTML = 'IMPORTANT';
      markItem.previousElementSibling.classList.remove('text-list__item--active');
      todoList[idElement].important = false;


    } else {
      markItem.classList.add('mark-list__item--active');
      markItem.innerHTML = 'NOT IMPORTANT';
      markItem.previousElementSibling.classList.add('text-list__item--active');
      todoList[idElement].important = true;


    }
    localSave();

  });
}

function unMarkText(blockClick) { // функция перечеркивания сообщений при клике по блоку с сообщением
  blockClick.querySelector('.text').addEventListener('click', function (event) {
    event.target.classList.toggle('unmarktext');
  });

}


  // todoList.forEach(function (item) {
  //   if (item.important === true) {

  //     console.log(pushStyle)


  //     //     element[1].classList.add('mark-list__item--active');
  //     //     pushStyle.innerHTML = 'NOT IMPORTANT';
  //     //     pushStyle.previousElementSibling.classList.add('text-list__item--active');
  //     //     console.log(pushStyle)

  //     //   }


  //   };

  // });




