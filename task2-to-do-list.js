// Global variables
let todos = [];
let editingId = null;

// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');

// Initialize app
function init() {
    loadTodos();
    todoForm.addEventListener('submit', handleSubmit);
    renderTodos();
}

// Load todos from localStorage
function loadTodos() {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    
    if (text) {
        if (editingId) {
            updateTodo(editingId, text);
            editingId = null;
        } else {
            addTodo(text);
        }
        todoInput.value = '';
        renderTodos();
    }
}

// Add new todo
function addTodo(text) {
    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    todos.push(todo);
    saveTodos();
}

// Update todo text
function updateTodo(id, newText) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.text = newText;
        saveTodos();
    }
}

// Toggle todo completion
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

// Edit todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todoInput.value = todo.text;
        todoInput.focus();
        editingId = id;
    }
}

// Update todo text inline
function updateTodoText(id, element) {
    const newText = element.textContent.trim();
    if (newText) {
        updateTodo(id, newText);
    } else {
        renderTodos(); // Reset if empty
    }
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    
    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
}

// Render all todos
function renderTodos() {
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        
        // Sort todos: incomplete first, then completed
        const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);
        
        sortedTodos.forEach(todo => {
            const li = createTodoElement(todo);
            todoList.appendChild(li);
        });
    }
    
    updateStats();
}

// Create todo element
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
        <input 
            type="checkbox" 
            class="todo-checkbox" 
            ${todo.completed ? 'checked' : ''}
            onchange="toggleTodo(${todo.id})"
        >
        <span 
            class="todo-text" 
            contenteditable="true"
            onblur="updateTodoText(${todo.id}, this)"
            onkeydown="if(event.key==='Enter'){this.blur()}"
        >${todo.text}</span>
        <div class="todo-actions">
            <button class="edit-btn" onclick="editTodo(${todo.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        </div>
    `;
    
    return li;
}

// Start the app
document.addEventListener('DOMContentLoaded', init);