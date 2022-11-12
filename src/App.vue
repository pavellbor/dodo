<template>
  <todo-logo />
  <todo-calendar-filter
    :date="date"
    @change="changeDate"
  />
  <todo-task-list>
    <Container @drop="onDrop">
      <Draggable
        v-for="task in filteredTaskList"
        :key="task.id"
      >
        <todo-task-item
          :task="task"
          :opened="openTaskItemId === task.id"
          @change="updateTask"
          @remove="removeTask"
          @open="openTaskItem(task.id)"
          @close="closeTaskItem"
        />
      </Draggable>
    </Container>
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
import TodoLogo from './components/TodoLogo.vue';

import { Container, Draggable } from 'vue-dndrop';
import TodoTaskList from './components/TodoTaskList.vue';

// import mocks from './mocks/tasks';

export default {
  components: {
    TodoAddTask,
    TodoTaskItem,
    TodoCalendarFilter,
    TodoLogo,
    Container,
    Draggable,
    TodoTaskList,
  },

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

    onDrop(dropResult) {
      const { removedIndex, addedIndex, payload } = dropResult;
      if (removedIndex === null && addedIndex === null) {
        return;
      }

      let itemToAdd = payload;
      let result = [...this.taskList];

      if (removedIndex !== null) {
        const item = this.filteredTaskList[removedIndex];
        const index = this.taskList.findIndex((x) => x.id === item.id);
        itemToAdd = result.splice(index, 1)[0];
      }

      if (addedIndex !== null) {
        const item = this.filteredTaskList[addedIndex];
        const index = this.taskList.findIndex((x) => x.id === item.id);
        result.splice(index, 0, itemToAdd);
      }

      this.taskList = result;
      API.setTasks(this.taskList);
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

.task-list {
  display: grid;
  // gap: 20px;
}
</style>
