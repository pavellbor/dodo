<template>
  <div
    v-if="opened"
    ref="calendarFilter"
    class="calendar-filter"
  >
    <div
      v-for="item in calendarList"
      :key="item.number"
      class="calendar-filter__item"
      :class="{ 'calendar-filter__item--active': isActiveDate(item.date) }"
      @click="changeDate(item.date)"
    >
      <span class="calendar-filter__number">{{ item.number }}</span>
      <span class="calendar-filter__name">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
const WEEK_DAYS_NAMES = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export default {
  props: {
    date: {
      type: Date,
      required: true,
    },
    opened: {
      type: Boolean,
      required: true,
    },
  },

  emits: {
    change: Date,
  },

  data() {
    return {
      calendarList: [],
    };
  },

  watch: {
    opened(newValue) {
      if (!newValue) {
        return;
      }

      this.$nextTick(() => {
        this.$refs.calendarFilter.scrollLeft = this.$refs.calendarFilter.scrollWidth;
      });
    },
  },

  created() {
    this.getCalendarList();
  },

  methods: {
    getCalendarList() {
      const sinceMonthDays = new Date().getDate() + 1; // TODO

      this.calendarList = [...Array(sinceMonthDays)].map((_, i) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const currentDay = i + 1;

        const date = new Date(currentYear, currentMonth, currentDay);
        const weekDayNumber = date.getDay();

        return {
          date,
          number: currentDay,
          name: WEEK_DAYS_NAMES[weekDayNumber],
        };
      });
    },

    isActiveDate(date) {
      return this.date.getDate() == date.getDate();
    },

    changeDate(date) {
      return this.$emit('change', new Date(date));
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-filter {
  display: flex;
  gap: 10px;
  margin-left: -10px;
  margin-right: -10px;
  padding-left: 10px;
  padding-right: 10px;
  overflow: auto;
  animation: fade 0.5s ease-in-out;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.calendar-filter__item {
  display: grid;
  flex-shrink: 0;
  justify-items: center;
  gap: 10px;
  width: 60px;
  padding: 15px 10px;
  border: 1px solid var(--light-color);
  border-radius: 8px;
  transition: color 0.25s ease-in-out;

  &--active {
    color: var(--primary-color);
  }
}

.calendar-filter__number {
  font-size: 24px;
}

.calendar-filter__name {
  text-transform: uppercase;
}
</style>
