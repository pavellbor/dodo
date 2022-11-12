class Api {
  getTasks() {
    const rawTasks = localStorage.getItem('tasks');
    const tasks = rawTasks ? JSON.parse(rawTasks) : [];

    return tasks;
  }

  setTasks(tasks) {
    const preparedTasks = JSON.stringify(tasks);

    localStorage.setItem('tasks', preparedTasks);
  }
}

export default new Api();
