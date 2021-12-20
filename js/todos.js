
window.todoStore = {
    todos : JSON.parse(localStorage.getItem('todo-store') || '[]'),


    save() {
        localStorage.setItem('todo-store', JSON.stringify(this.todos))
    }
};

window.todos = function () {
    return {
        ...todoStore,
        filter: 'all',
        isEditing : null,
        get active () {
            return this.todos.filter(todo => ! todo.complete)
        },
        get completed () {
            return this.todos.filter(todo => todo.complete)
        },
        newTodo : '',

        get filteredTodos () {
            return {
                all : this.todos,
                active: this.active,
                completed: this.completed
            }[this.filter]
        },
        get allComplete()
        {
            return this.todos.length === this.completed.length
        },
        addTodo () {
            if (! this.newTodo) {
                return ;
            }

            this.todos.push({
                id : Date.now(),
                body : this.newTodo,
                complete : false
            })
            this.save();
            this.newTodo = '';
        },
        deleteTodo(id) {
            this.todos = this.todos.filter(todo => todo.id != id)
            this.save();
        },
        compelteTodo(todo){
            todo.complete = ! todo.complete
            this.save();
        },

        editTodo(todo) {
            todo.cachedBody = todo.body;
            this.isEditing = todo;
        },
        cancelEditing(todo) { 
            todo.body = todo.cachedBody;
            this.isEditing = null;
            delete cachedBody;
        },
        finishEdit (todo) {
            if(todo.body.trim() === ''){
                return this.deleteTodo(todo.id);
            }
            this.isEditing = null;
            this.save();
        },

        toggleAllTodos () {
            let allComplete = this.allComplete;
            this.todos.forEach(todo => todo.complete = ! allComplete);
            this.save();
        },

        clearCompleted() {
            this.todos = this.active;
            this.save();
        }

    };
}