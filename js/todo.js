class Todo {
  constructor(task) {
    const now = new Date().toLocaleString();
    this.id = Date.now();
    this.task = task;
    this.createdAt = now;
    this.updatedAt = now;
  }
}
