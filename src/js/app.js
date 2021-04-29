import '../scss/app.scss';

// описываем все переменные
const btn = document.querySelector('#btn'); // кнопка добавить
const inputMsg = document.querySelector('#input'); // поле ввода
const todoBlock = document.querySelector('#todoList'); // отображение блока сообщений
let todoList = []; // массив хранения объектов ввода


getLocal(); // отображение данных из локального хранилища
activeClick(); // действия по вкладкам в приложении
activeLink(); // функция примнения активных стилей ко вкладкам в гланом меню
siteSearch(); // поиск на сайте
allListens(); // функция поиска кликов (прослушивание элементов) блока сообщений
saveInput(); // формирование и сохранение объекта сообщения


function getLocal() {
  const data = localStorage.getItem('todoList'); // получили данные
  if (!data) return; // седалли негативную проверку и сразу return
  todoList = JSON.parse(data);
  vievTodoList(); // передали значение в другую функцию
}


// создаем функцию для сохраниния данных в локал
function localSave() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// создаем функцию для воода и сохранения значений, и их отображения в теле документа


function saveInput() {

  btn.addEventListener('click', () => {
    if (!inputMsg.value || inputMsg.value[0] === ' ') return inputMsg.value = ''; // проверка ввода пустой строки и пробелов
    const todoMessage = { // объект сообщения
      todo: inputMsg.value,
      checked: false,
      mark: false,
    };
    todoList.unshift(todoMessage); // добавляем объект в массив
    vievTodoList(); // вызываем функцию отображения при клике
    inputMsg.value = ''; // очищаем значение ввода
    localSave(); // вызываем функцию сохранения
    allListens(); // вызываем функцию прослушивания кликов блока сообщений
  });
}

// визуализируем блок сообщения, добавляем на экран

function vievTodoList() {
  todoBlock.innerHTML = '';

  todoList.forEach((item, index) => { // перебираем элементы, и добавляем id
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


function allListens() { // функция поиска кликов по всему блоку сообщений
  const listItems = document.querySelectorAll('.main-list__item');
  listItems.forEach((item) => { // перебираем клики на кнопках
    delMessage(item); // удаление сообщений
    markText(item); // применение стилей по клику
    unMarkText(item); // перечеркивание сообщения
    activeClick(); // перечеркивание сообщения
  });
}

function delMessage(buttonClick) { // функция удаления сообщений
  buttonClick.querySelector('.del_button').addEventListener('click', (event) => {
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
    .addEventListener('click', (item) => {
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
    .addEventListener('click', (event) => {
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



function siteSearch() { // функция поиска
  document.querySelector('#header__id').oninput = function () {
    const value = this.value.trim(); // значение ввода
    const itemsSerch = document.querySelectorAll('#todoList li');
    if (value !== '') {
      itemsSerch.forEach((element) => {
        if (element.innerText.search(value) == -1) {
          element.style.display = 'none'; // убираем не подходящие блоки
        } else {
          element.style.display = 'flex';
        }
      });
    } else {
      itemsSerch.forEach((element) => {
        element.style.display = 'flex'; // возвращаем обратное значение
      });
    }
  };
}
inputMsg.addEventListener("input", siteSearch); // отфильтровка остаточных значений



function activeLink() { // функция примнения активных стилей ко вкладкам в гланом меню
  let listItem = document.getElementById('list'); // находим список
  let listITems = listItem.getElementsByClassName('nonclick'); // находим ссылки по классу

  for (let i = 0; i < listITems.length; i++) { // перебираем каждую ссылку в цикле
    listITems[i].addEventListener('click',  function() {
      let elem = listItem.getElementsByClassName('active'); // находим елемент с активным классом
      elem[0].className = listITems[0].className.replace(' active', '');
      this.className += ' active'; // присваиваем по клику активный класс текущему элементу
    });
  }
}



function activeClick() {
  const delForm = document.querySelector('#taskform'); //находим форму
  let listItems = document.querySelectorAll('.main-list__items li'); // находим все элементы списка
  let impButtom = document.querySelectorAll('.mark-list__item'); // находим кнопки

  document.getElementById('all').addEventListener('click', () => {
    delForm.style.display = 'block'; // не скрываем блок ввода
    impButtom.forEach( (elem) => {
      elem.style.visibility = 'visible'; // не скрываем кнопку важности
    })
    listItems.forEach((element) => {
      element.style.display = 'flex'; // отображаем все элементы списка
    });
  });

  document.getElementById('active').addEventListener('click', () => {
    delForm.style.display = 'block';
    impButtom.forEach( (elem) => {
      elem.style.visibility = 'visible';
    })
    listItems.forEach((element) => {
      if (element.children[0].classList.contains('unmarktext')) { // проверяем элемент на наличие стиля перечеркивания
        element.style.display = 'none';
      } else {
        element.style.display = 'flex'; // отображаем элемент
      }
    })
  });

  document.getElementById('done').addEventListener('click',  () => {
    delForm.style.display = 'none'; // скрываем поле ввода
    impButtom.forEach((elem) => {
      elem.style.visibility = 'hidden'; // скрываем кнопку важности
    })
    listItems.forEach((element) => {
      if (element.children[0].classList.contains('unmarktext')) {
        element.style.display = 'flex'; // отображаем выполненные задания
      } else {
        element.style.display = 'none';
      }
    })
  });
}




// notHover(); // проверка на наличие тачскрина

// function notHover() {
//   if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
//     console.log('this is a touch device');
//     document.body.classList.add('no-batch');
//   } else {
//     console.log('this is not a touch device');
//   }
// }

