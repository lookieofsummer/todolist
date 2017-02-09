var bindEventAdd = function() {
    var addButton = document.querySelector('#id-button-add')
    addButton.addEventListener('click', function(){
        var todoInput = document.querySelector('#id-input-todo')
        var task = todoInput.value
        var todo = {
            'task': task,
            'time': currentTime()
        }
        todoList.push(todo)
        saveTodos()
        insertTodo(todo)
    })
}

var bindEventEnter = function() {
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener('keydown', function(event){
        var target = event.target
        if(event.key === 'Enter') {
            target.blur()
            event.preventDefault()
            var index = indexOfElement(target.parentElement)
            todoList[index].task = target.innerHTML
            saveTodos()
        }
    })
}

var bindEventButton = function() {
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener('click', function(event){
        var target = event.target
        if(target.classList.contains('todo-done')) {
            var todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
        } else if (target.classList.contains('todo-delete')) {
            var todoDiv = target.parentElement
            var index = indexOfElement(target.parentElement)
            todoDiv.remove()
            todoList.splice(index, 1)
            saveTodos()
        } else if (target.classList.contains('todo-edit')) {
            var cell = target.parentElement
            var span = cell.children[3]
            span.setAttribute('contenteditable', 'true')
            span.focus()
        }
    })
}

var EventType = {
    blur: 'blur',
    click: 'click',
}

var bindEventBlur = function() {
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener(EventType.blur, function(event){
        var target = event.target
        if (target.classList.contains('todo-label')) {
            target.setAttribute('contenteditable', 'false')
            var index = indexOfElement(target.parentElement)
            todoList[index].task = target.innerHTML
            saveTodos()
        }
    }, true)
}

var bindEvents = function() {
    bindEventAdd()
    bindEventEnter()
    bindEventButton()
    bindEventBlur()
}


var insertTodo = function(todo) {
    var todoContainer = document.querySelector('#id-div-container')
    var t = templateTodo(todo)
    todoContainer.insertAdjacentHTML('beforeend', t);
}

var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <span class='todo-label' contenteditable='false'>${todo.task}</span>
            <span>${todo.time}</span>
            <button class='todo-done btn'>完成</button>
            <button class='todo-delete btn'>删除</button>
            <button class='todo-edit btn'>编辑</button>


        </div>
    `
    return t
}


var saveTodos = function() {
    var s = JSON.stringify(todoList)
    localStorage.todoList = s
}

var loadTodos = function() {
    var s = localStorage.todoList
    return JSON.parse(s)
}

var indexOfElement = function(element) {
    var parent = element.parentElement
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i]
        if (e === element) {
            return i
        }
    }
}

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var currentTime = function() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var timeString = `${year}/${month}/${date} ${hours}:${minutes}`
    return timeString
}


var initTodos = function() {
    todoList = loadTodos()
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        insertTodo(todo)
    }
}


var todoList = []

var __main = function() {
    bindEvents()
    initTodos()
}

__main()
