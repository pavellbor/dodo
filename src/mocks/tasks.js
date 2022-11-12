const NAMES = [
  'Покормить кота',
  'Покормить воробушек',
  'Посмотреть "Сердце Пармы"',
  'Делать зарядку каждые два часа',
  'Заказать настольные игры на Вайлдбериз и Озон',
];

const DESCRIPTIONS = [
  'Жизнь боль, но что поделать?',
  '',
  'Сделай как можно быстрее',
  '',
  'Задача очень важная для твоего прогресса мальчик красавчик',
  '',
  'Обрати внимание на сайт Kupus.top',
];

const getRandomBoolean = () => {
  return !!Math.round(Math.random());
};

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomItem = (list) => {
  return list[getRandomNumber(list.length)];
};

const getRandomDate = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const currentDay = getRandomNumber(1, 6);

  const date = new Date(currentYear, currentMonth, currentDay);

  return date;
};

const generateTask = () => {
  const task = {
    id: Math.random(),
    completed: getRandomBoolean(),
    name: getRandomItem(NAMES),
    description: getRandomItem(DESCRIPTIONS),
    date: getRandomDate(),
    // start: this.start,
    // end: this.end,
  };

  return task;
};

const taskList = [...Array(20)].map(generateTask);

export default taskList;
