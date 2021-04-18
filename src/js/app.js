import '../scss/app.scss';

// описываем все переменные
const btn = document.querySelector('#btn'); // кнопка
const inputMsg = document.querySelector('#input'); // поле ввода
const todoBlock = document.querySelector('#todoList'); // блок сообщения
let todoList = []; // массив хранения объектов ввода

// проверка данных в локальном хранилище
if (localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    vievTodoList(); // вызываем функцию отображения при клике
}

// создаем функцию для объекта хранящего наши значения
btn.addEventListener('click', function () {
    const todoMessage = { // объект сообщения
        todo: inputMsg.value,
        checked: false,
        important: false,
        id: 0,
    };

    todoList.unshift(todoMessage); // добавляем объект в массив
    vievTodoList(); // вызываем функцию отображения при клике
    localStorage.setItem('todoList', JSON.stringify(todoList)); // переводим строку в JSON
});

// визуализируем блок сообщений, добавляем весь на экран
function vievTodoList() {
    let viewMessage = '';
    for (const item of todoList) {
        let indexId = todoList.indexOf(item);// добавляем id каждому сообщению по индексу элемента

        viewMessage += `
        <li class="main-list__item" id = "${indexId}">
            <div class="text"><p>${item.todo}</p></div>
            <div class="del_button" id = "${indexId}">
            <img src="./images/content/del.svg" title="Delete"></div>
        </li>
        `;
        todoBlock.innerHTML = viewMessage;
    }
}

let delBtn = document.querySelectorAll('.del_button'); // кнопка удаления сообщения

delBtn.forEach(click => { // перебираем клики на кнопках
    delMessage(click);
});

function delMessage(buttonClick) { // удаление сообщения
    buttonClick.addEventListener('click', function (event) {
        let parentId = event.closest('div');
        // todoList.splice(parentId, 1);
        console.log(parentId);
        // localStorage.setItem('todoList', JSON.stringify(todoList));
        // location.reload();
        // vievTodoList();
    });
};
// function delMessage(index) {
//     if (todoList.length !== 1) {
//         todoList = todoList.splice(index, 1);
//         localStorage.setItem('todoList', JSON.stringify(todoList));
//         vievTodoList(); // вызываем функцию отображения при клике
//     };
//     todoList = todoList.splice();
//     localStorage.setItem('todoList', JSON.stringify(todoList));
//     vievTodoList(); // вызываем функцию отображения при клике
// };
