# Проверка "ToDoList"

## git

* ~~Не нужно удалять ветку *main*.~~

## package.json

* ~~Для запуска проекта лучше использовать *start* вместо *dev*.~~

## UX

* Щёлкая только по определённой части элемента "задания" можно пометить его как выполненное.
* В мобильной версии не видны кнопки удалить и пометить как важное.

## styles

* ~~Лишние пустые файлы можно в проект и не тянуть.~~

## script

* ~~Добавить удаление пробельных символов. Сейчас можно добавить задание из пробелов. Например: *"   "*.~~
* Все вызовы функций лучше поднять в самое начало файла, а декларирование делать после их вызова.

* Лучше получить localStorage, а потом делать проверку, а после проверки делать что-то с localStorage (см пример ниже).
* Если после проверки в *if()* нету else, то лучше сделать негативную проверку и сразу *return* (см пример ниже).
* Лучше не делать сайд эффектов в функциях, а возвращать какое либо значение или передавать это значение в другую функцию, а там это значение уже использовать (см пример ниже).
Вместо:
```javascript
    function getLocal() {
        if (localStorage.getItem('todoList') != undefined) {
            todoList = JSON.parse(localStorage.getItem('todoList'));
            vievTodoList();
        }
    }
```
Лучше:
```javascript
    function getLocal() {
        const data = localStorage.getItem('todoList'); // получили данные

        if (!data) return; // седалли негативную проверку и сразу return

        vievTodoList(JSON.parse(data)); // передали значение в другую функцию
    }
```
* ~~Там где можно используем стрелочные функции (см пример ниже).~~
Вместо:
```javascript
    function vievTodoList() {
        todoBlock.innerHTML = '';

        todoList.forEach(function (item, index) {
            ...
        });
    }
```
Лучше:
```javascript
    function vievTodoList(todoList) { // получаем данные, а не берём мутированные из вне
        todoBlock.innerHTML = '';

        todoList.forEach((item, index) => { // используем стрелочную функцию
            ...
        });
    }
```
* Соблюдай форматирование, либо запуска проверку линтера перед коммитом (см пример ниже).
* Все элементы DOM лучше получать зарание, а не при каждом вызове функции, если они остаются доступны после обновления DOM дерева (см пример ниже).
* Если это ссылка на DOM элемент, то лучше использовать *const* вместо *let*.
Вместо:
```javascript
    function activeClick() {
    let delForm = document.querySelector('#taskform'); 
    let listItems = document.querySelectorAll('.main-list__items li');
    let impButtom = document.querySelectorAll('.mark-list__item');
    
        document.getElementById('all').addEventListener('click', function () {
            delForm.style.display = 'block'; // не скрываем блок ввода
        ...
    }
```
Лучше:
```javascript
    const all = document.getElementById('all'); // нашли элемент в DOM в самом начале исполнения файла
    const delForm = document.querySelector('#taskform'); // использовали const
    ...
    function activeClick() {
        const listItems = document.querySelectorAll('.main-list__items li'); // добавили отступ
        const impButtom = document.querySelectorAll('.mark-list__item'); // добавили отступ
        
        all.addEventListener('click', () => { // использовали  стрелочную функцию
            delForm.style.display = 'block'; // не скрываем блок ввода
        ...
    }
```
* Лучше для перебора массива использовать цикл for...of.