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
  li.innerHTML = `${todo.task} (${todo.date}) <button class="delete">X</button>`;
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
  if (e.target.classList.contains("delete")) {
    const id = Number(e.target.parentElement.dataset.id);
    todos = todos.filter((todo) => todo.id !== id);
    Storage.saveTodos(todos);
    renderTodos(todos);
  }
});

clearBtn.addEventListener("click", () => {
  todos = [];
  Storage.saveTodos(todos);
  renderTodos(todos);
});

renderTodos(todos);
