<template>
  <section class="add-task">
    <button
      v-show="!opened"
      class="add-task__show-btn"
      @click="openForm"
    >
      <i class="bi bi-plus"></i>
    </button>
    <form
      v-show="opened"
      class="add-task__form"
      @submit.prevent="add"
    >
      <button
        class="add-task__close-btn"
        type="button"
        @click="closeForm"
      >
        <i class="bi bi-x"></i>
      </button>
      <div class="add-task__field">
        <input
          ref="nameInput"
          v-model="name"
          class="add-task__name-input"
          type="text"
          placeholder="Название задачи"
          required
        />
      </div>
      <details class="add-task__details">
        <summary class="add-task__details-summary">Подробнее</summary>
        <div class="add-task__details-dropdown">
          <div class="add-task__field">
            <textarea
              v-model="description"
              placeholder="Комментарий"
              rows="3"
            />
          </div>
          <div class="add-task__field">
            <span class="add-task__label">Начало</span>
            <input
              v-model="start"
              type="time"
            />
          </div>
          <div class="add-task__field">
            <span class="add-task__label">Окончание</span>
            <input
              v-model="end"
              type="time"
            />
          </div>
        </div>
      </details>
      <div class="add-task__footer">
        <button class="add-task__submit-btn">Добавить</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
      default: new Date(),
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    add: Object,
    open: null,
    close: null,
  },

  data() {
    return {
      name: '',
      description: '',
      start: null,
      end: null,
    };
  },

  methods: {
    openForm() {
      this.$emit('open');
      this.setFocus();
    },

    closeForm() {
      this.$emit('close');
    },

    add() {
      const task = {
        id: Date.now(),
        completed: false,
        name: this.name,
        description: this.description,
        date: this.date,
        start: this.start,
        end: this.end,
      };

      this.resetForm();
      this.setFocus();
      this.$emit('add', task);
    },

    resetForm() {
      this.name = '';
      this.description = '';
      this.start = null;
      this.end = null;
    },

    setFocus() {
      this.$nextTick().then(() => {
        this.$refs.nameInput.focus();
        this.$el.scrollIntoView();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-task__show-btn {
  height: 50px;
  font-size: 24px;
  color: var(--primary-color);
  background: #ffffff;
}

.add-task__form {
  position: relative;
  display: grid;
  gap: 20px;
  padding: 50px 20px 30px;
  border: 1px solid var(--light-color);
  border-radius: 15px;
}

.add-task__close-btn {
  position: absolute;
  top: 10px;
  right: 13px;
  width: 30px;
  height: 30px;
  padding: 0;
  font-size: 24px;
  background: none;
  border: none;
}

.add-task__field {
  display: grid;
  gap: 10px;
}

.add-task__details-dropdown {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}

.add-task__submit-btn {
  border: none;
  background: var(--primary-color);
  color: #ffffff;
}
</style>
