const form = document.getElementById("todo-form");
const list = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-all");

let todos = Storage.getTodos();

const renderTodos = (items) => {
  list.innerHTML = "";
  items.forEach((todo) => createTodoElement(todo));
};

const createTodoElement = (todo) => {
  const li = document.createElement("li");
  li.dataset.id = todo.id;

  li.innerHTML = `
    <div>
      <strong>${todo.task}</strong><br/>
      <small>Created: ${todo.createdAt}</small><br/>
      <small>Updated: ${todo.updatedAt}</small>
    </div>
    <div>
      <button class="edit">Edit</button>
      <button class="delete">X</button>
    </div>
  `;

  list.appendChild(li);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = document.getElementById("task").value;
  const date = document.getElementById("date").value;

  const todo = new Todo(task, date);
  todos.push(todo);
  Storage.saveTodos(todos);
  renderTodos(todos);
  form.reset();
});

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  const id = Number(li.dataset.id);

  if (e.target.classList.contains("delete")) {
    todos = todos.filter((t) => t.id !== id);
  }

  if (e.target.classList.contains("edit")) {
    const newTask = prompt("Update task");
    if (newTask) {
      todos = todos.map((t) =>
        t.id === id
          ? { ...t, task: newTask, updatedAt: new Date().toLocaleString() }
          : t,
      );
    }
  }

  Storage.saveTodos(todos);
  renderTodos(todos);
});

clearBtn.addEventListener("click", () => {
  todos = [];
  Storage.saveTodos(todos);
  renderTodos(todos);
});

renderTodos(todos);
