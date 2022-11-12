<template>
  <div class="task-list">
    <slot>Нет задач</slot>
  </div>
</template>

<style lang="scss" scoped>
.task-list {
  display: grid;
  gap: 20px;
}
</style>
