<template>
  <header class="header">
    <div class="header__logo">DODO</div>
    <button
      class="header__filter-btn"
      :class="{ 'header__filter-btn--active': filterOpened }"
      @click="toggleFilter"
    >
      <i class="bi bi-filter-right"></i>
    </button>
  </header>
</template>

<script>
export default {
  props: {
    filterOpened: {
      type: Boolean,
      required: true,
    },
  },

  emits: {
    toggleFilter: null,
  },

  methods: {
    toggleFilter() {
      this.$emit('toggleFilter');
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
}

.header__logo {
  font-size: 28px;
  color: var(--primary-color);
  text-align: center;
}

.header__filter-btn {
  position: absolute;
  top: 50%;
  right: 0;
  width: auto;
  height: auto;
  padding: 0;
  font-size: 24px;
  background: #ffffff;
  border: none;
  transform: translateY(-50%);
  transition: color 0.25s ease-in-out;

  &--active {
    color: var(--primary-color);
  }
}
</style>
