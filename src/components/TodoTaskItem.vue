<template>
  <div
    class="task-item"
    :class="{ 'task-item--expanded': opened, 'task-item--editing': editing }"
    @click="toggleExpanded"
  >
    <div class="task-item__main-content">
      <span
        class="task-item__checkbox"
        :class="{ 'task-item__checkbox--active': task.completed }"
        @click.stop="toggleCompleted"
      >
        <i class="bi bi-check"></i>
      </span>
      <div class="task-item__text-content">
        <span
          ref="taskName"
          class="task-item__name"
          :contenteditable="editing"
          >{{ task.name }}</span
        >
        <span
          v-show="task.description || editing"
          ref="taskDescription"
          class="task-item__desc"
          :contenteditable="editing"
          placeholder="Комментарий"
        >
          {{ task.description }}
        </span>
      </div>
    </div>
    <div
      v-if="opened"
      class="task-item__dropdown"
    >
      <button
        v-if="editing"
        class="task-item__btn"
        @click.prevent="save"
      >
        Сохранить
      </button>
      <button
        v-else
        class="task-item__btn"
        @click.prevent="edit"
      >
        Редактировать
      </button>
      <button
        class="task-item__btn"
        @click.prevent="remove"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    change: Object,
    remove: Number,
    open: null,
    close: null,
  },

  data() {
    return {
      editing: false,
    };
  },

  methods: {
    open() {
      this.$emit('open');
    },

    close() {
      this.$emit('close');
    },

    toggleExpanded() {
      if (this.editing) {
        return;
      }

      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    },

    toggleCompleted() {
      const changedTask = {
        ...this.task,
        completed: !this.task.completed,
      };

      this.$emit('change', changedTask);
    },

    toggleEditing() {
      this.editing = !this.editing;
    },

    remove() {
      this.$emit('remove', this.task.id);
    },

    edit() {
      this.toggleEditing();
      this.$nextTick(() => this.$refs.taskName.focus());
    },

    save() {
      const name = this.$refs?.taskName.innerHTML;
      const description = this.$refs?.taskDescription.innerHTML;

      const changedTask = {
        ...this.task,
        name,
        description,
      };

      this.toggleEditing();
      this.$emit('change', changedTask);
    },
  },
};
</script>

<style lang="scss" scoped>
.task-item {
  display: grid;
  gap: 15px;
  margin-bottom: 15px;
  padding: 15px 20px;
  background: #ffffff;
  border: 1px solid var(--light-color);
  border-radius: 8px;
  animation: fade 0.5s ease-in-out;
}

.task-item__main-content {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
}

.task-item__text-content {
  display: grid;
  gap: 5px;
  line-height: 1.3;
}

.task-item__name {
  align-self: center;
  font-size: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.task-item__desc {
  opacity: 0.5;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.task-item--editing .task-item__desc {
  &:empty::before {
    content: attr(placeholder);
    color: #555;
  }

  &:empty:focus::before {
    content: '';
  }
}

.task-item--expanded .task-item__name,
.task-item--expanded .task-item__desc {
  white-space: normal;
  overflow: auto;
}

.task-item__checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  font-size: 24px;
  color: var(--primary-color);
  border: 2px solid var(--light-color);
  border-radius: 8px;
  transition: border-color 0.25s ease-in-out;

  &--active {
    border-color: var(--primary-color);
  }
}

.task-item__checkbox .bi-check {
  font-size: 24px;
  color: var(--primary-color);
  transform: translateY(1px);
  display: none;
}

.task-item__checkbox--active .bi-check {
  display: block;
}

.task-item__dropdown {
  display: flex;
  gap: 10px;
  padding-top: 15px;
  border-top: 1px solid var(--light-color);
  animation: fade 0.5s ease-in-out;
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.task-item__btn {
  border: none;
}
</style>
