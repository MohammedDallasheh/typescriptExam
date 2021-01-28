{
    let taskArr = [];
    let id = 0;
    class Task {
        constructor(text, id, done = false) {
            this._id = 0;
            this._done = false;
            this._text = text;
            this._id = id;
            this._done = done;
        }
        get id() { return this._id; }
        set id(id) { this._id = id; }
        get text() { return this._text; }
        set text(txt) { this._text = txt; }
        get done() { return this._done; }
        set done(d) { this._done = d; }
        returnObj() {
            return {
                id: this._id,
                text: this._text,
                done: this._done,
            };
        }
    }
    const taskInput = document.getElementById('todo-item');
    const taskSaveBtn = (document.getElementById('todo-save'));
    const todoList = document.getElementById('todo-list');
    const todoDelall = (document.getElementById('todo-delall'));
    todoDelall.addEventListener('click', deleteAll);
    const todoDelcom = (document.getElementById('todo-delcom'));
    todoDelcom.addEventListener('click', deleteCompleted);
    taskSaveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const newTask = new Task(taskInput.value, id++);
        taskArr.push(newTask);
        taskToHtml(newTask);
        saveToStorge();
        taskInput.value = '';
    });
    (() => {
        const taskObjArr = JSON.parse(localStorage.getItem('tasks')) || [];
        taskArr = taskObjArr.map(({ text, done }) => new Task(text, id++, done));
        taskArr.forEach((task) => taskToHtml(task));
    })();
    function taskToHtml(task) {
        console.log(task.done);
        todoList.innerHTML += `
        <div class="todo-row " id="${task.id}">
          <div class="todo-item ${task.done ? 'done' : 'qwe'}">${task.text}</div>
          <div class="todo-ok" onclick="toggleTask(${task.id})">x</div>
        </div>
        `;
    }
    function saveToStorge() {
        const taskObjArr = taskArr.map((task) => task.returnObj());
        localStorage.setItem('tasks', JSON.stringify(taskObjArr));
    }
    function deleteAll() {
        if (!alert('delete all ?'))
            return;
        taskArr = [];
        localStorage.setItem('tasks', '');
        document.getElementById('todo-list').innerHTML = '';
    }
    function deleteCompleted() {
        if (!alert('delete completed ?'))
            return;
        taskArr = taskArr.filter((task) => {
            if (!task.done)
                return true;
            document.getElementById(`${task.id}`).remove();
            return false;
        });
        saveToStorge();
    }
    function alert(str) {
        return confirm(str);
    }
    function toggleTask(taskId) {
        const task = taskArr.filter((task) => task.id == taskId)[0];
        task.done = !task.done;
        const taskItem = document.getElementById(`${taskId}`).children[0];
        if (taskItem.classList.contains('done')) {
            taskItem.classList.remove('done');
        }
        else {
            taskItem.classList.add('done');
        }
        saveToStorge();
    }
}
