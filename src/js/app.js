import '../scss/app.scss';


// описываем все переменные
let btn = document.querySelector('#btn'); //кнопка
let inputMsg = document.querySelector('#input'); //поле ввода
let todoBlock = document.querySelector('#todoList');
let todoList = []; //массив хранения объектов ввода

// проверка данных в локальном хранилище
if (localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    vievTodoList(); // вызываем функцию отображения при клике

};

//описываем действия
btn.addEventListener('click', function () {

    let todoMessage = { // объект сообщения
        todo: inputMsg.value,
        checked: false,
        important: false, //отключаем стили
    };

    todoList.unshift(todoMessage); // добавляем объект в массив
    vievTodoList(); // вызываем функцию отображения при клике
    localStorage.setItem('todoList', JSON.stringify(todoList));

});

function vievTodoList() {
    let viewMessage = '';
    for (let item of todoList) {
        viewMessage += `
        <li class="main-list__item">${item.todo}</li>
        `;
        todoBlock.innerHTML = viewMessage;
    }

};




