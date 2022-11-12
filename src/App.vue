<template>
  <todo-logo />
  <todo-calendar-filter
    :date="date"
    @change="changeDate"
  />
  <todo-task-list>
    <todo-task-item
      v-for="task in filteredTaskList"
      :key="task.id"
      :task="task"
      :opened="openTaskItemId === task.id"
      @change="updateTask"
      @remove="removeTask"
      @open="openTaskItem(task.id)"
      @close="closeTaskItem"
    />
    <todo-add-task
      :opened="addTaskFormOpened"
      :date="date"
      @add="addTask"
      @open="openAddTaskForm"
      @close="closeAddTaskForm"
    />
  </todo-task-list>
</template>

<script>
import 'normalize.css';
import API from './api/api';
import TodoAddTask from './components/TodoAddTask.vue';
import TodoCalendarFilter from './components/TodoCalendarFilter.vue';
import TodoTaskItem from './components/TodoTaskItem.vue';
import TodoTaskList from './components/TodoTaskList.vue';
import TodoLogo from './components/TodoLogo.vue';

// import mocks from './mocks/tasks';

export default {
  components: { TodoAddTask, TodoTaskItem, TodoTaskList, TodoCalendarFilter, TodoLogo },

  data() {
    return {
      taskList: [],
      date: new Date(),
      addTaskFormOpened: false,
      openTaskItemId: null,
    };
  },

  computed: {
    filteredTaskList() {
      return this.taskList.filter((task) => {
        return new Date(task.date).getDate() === this.date.getDate(); // TODO
      });
    },
  },

  created() {
    this.taskList = API.getTasks();
  },

  methods: {
    addTask(task) {
      this.taskList.push(task);
      API.setTasks(this.taskList);
    },

    removeTask(id) {
      this.taskList = this.taskList.filter((task) => task.id !== id);
      API.setTasks(this.taskList);
    },

    updateTask(changedTask) {
      const taskIndex = this.taskList.findIndex((task) => task.id === changedTask.id);

      this.taskList.splice(taskIndex, 1, changedTask);
      API.setTasks(this.taskList);

      this.closeTaskItem();
    },

    changeDate(date) {
      this.date = date;
      this.closeAddTaskForm();
      this.closeTaskItem();
    },

    openAddTaskForm() {
      this.addTaskFormOpened = true;
      this.closeTaskItem();
    },

    closeAddTaskForm() {
      this.addTaskFormOpened = false;
    },

    openTaskItem(id) {
      this.openTaskItemId = id;
      this.closeAddTaskForm();
    },

    closeTaskItem() {
      this.openTaskItemId = null;
    },
  },
};
</script>

<style lang="scss">
:root {
  --font: 16px Arial, Helvetica, sans-serif;
  --primary-color: #dc4700;
  --light-color: #ebebeb;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 40px 10px;
  font: var(--font);
  color: #333333;
}

input,
textarea,
button {
  width: 100%;
  padding: 10px;
  font: inherit;
  border: 1px solid var(--light-color);
  border-radius: 8px;
}

*:focus {
  outline-color: var(--primary-color);
}

#app {
  display: grid;
  gap: 30px;
}
</style>
