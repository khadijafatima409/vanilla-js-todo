const Storage = (() => {
  const KEY = "todos";

  const getTodos = () => JSON.parse(localStorage.getItem(KEY)) || [];

  const saveTodos = (todos) => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  };

  return { getTodos, saveTodos };
})();
