{
    let taskArr: Array<Task> = [];
    let id: number = 0;
    class Task {
        public _id: number = 0;
        public _text: string;
        public _done: boolean = false;
        constructor(text: string, id: number, done: boolean = false) {
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
        returnObj(): object {
            return {
                id: this._id,
                text: this._text,
                done: this._done,
            };
        }
    }

    const taskInput: any = <HTMLInputElement>document.getElementById('todo-item');
    const taskSaveBtn: any = <HTMLInputElement>(
        document.getElementById('todo-save')
    );
    const todoList: any = <HTMLInputElement>document.getElementById('todo-list');
    const todoDelall: any = <HTMLInputElement>(
        document.getElementById('todo-delall')
    );
    todoDelall.addEventListener('click', deleteAll);

    const todoDelcom: any = <HTMLInputElement>(
        document.getElementById('todo-delcom')
    );
    todoDelcom.addEventListener('click', deleteCompleted);

    taskSaveBtn.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        const newTask: Task = new Task(taskInput.value, id++);
        taskArr.push(newTask);
        taskToHtml(newTask);
        saveToStorge();
        taskInput.value = '';
    });

    (() => {
        const taskObjArr: { text: string; id: number; done: boolean }[] =
            JSON.parse(localStorage.getItem('tasks')) || [];
        taskArr = taskObjArr.map(({ text, done }) => new Task(text, id++, done));
        taskArr.forEach((task) => taskToHtml(task));
    })();

    function taskToHtml(task: Task): void {
        console.log(task.done);
        todoList.innerHTML += `
        <div class="todo-row " id="${task.id}">
          <div class="todo-item ${task.done ? 'done' : 'qwe'}">${task.text
            }</div>
          <div class="todo-ok" onclick="toggleTask(${task.id})">x</div>
        </div>
        `;
    }

    function saveToStorge(): void {
        const taskObjArr: object[] = taskArr.map((task) => task.returnObj());
        localStorage.setItem('tasks', JSON.stringify(taskObjArr));
    }
    function deleteAll(): void {
        if (!alert('delete all ?')) return
        taskArr = [];
        localStorage.setItem('tasks', '');
        document.getElementById('todo-list').innerHTML = '';
    }

    function deleteCompleted(): void {
        if (!alert('delete completed ?')) return
        taskArr = taskArr.filter((task) => {
            if (!task.done) return true
            document.getElementById(`${task.id}`).remove();
            return false;
        });
        saveToStorge();
    }
    function alert(str: string): boolean {
        return confirm(str)
    }
    function toggleTask(taskId: number): void {
        const task: Task = taskArr.filter((task) => task.id == taskId)[0];
        task.done = !task.done;

        const taskItem = document.getElementById(`${taskId}`).children[0];
        if (taskItem.classList.contains('done')) {
            taskItem.classList.remove('done');
        } else {
            taskItem.classList.add('done');
        }
        saveToStorge();
    }
}
