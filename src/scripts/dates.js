import { getMonth, getDaysInMonth, getDay, getDate } from 'date-fns';

const getCurrentMonth = (currentDate) => {
  const currentMonth = getMonth(currentDate);
  return currentMonth;
};

const getDaysOfCurrentMonth = (currentDate) => {
  const daysOfCurrentMonth = getDaysInMonth(currentDate);
  return daysOfCurrentMonth;
};

const getMonthName = (monthIndex) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[monthIndex];
};

const getWeekdayName = (weekdayIndex) => {
  const weekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekdayNames[weekdayIndex];
};

const getShortenWeekdayNames = () => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};

const convertMinutesToTime = (minutes) => {
  let hours = minutes / 60;
  let sign = 'AM';
  const minutesLeft = minutes % 60;

  if (hours >= 12) {
    if (hours > 12) hours = hours - 12;
    sign = 'PM';
  }

  let hoursString = hours.toString();
  let minutesString = minutesLeft.toString();

  console.log(minutesString, 'minutesString');

  if (hoursString.length === 1) hoursString = `0${hoursString}`;

  if (minutesString.length === 1) minutesString = `0${minutesString}`;

  const timeString = `${hoursString}:${minutesString} ${sign}`;
  return timeString;
};

const getDaysOfTheMonthObjects = (amountOfDays, firstDayOfWeek) => {
  const daysObject = [];
  const amountOfIndexesInAWeek = 6;
  let currentIndex = firstDayOfWeek;

  for (let i = 1; i < amountOfDays + 1; i++) {
    const dayObject = {
      dayOfTheMonth: i,
      weekIndex: currentIndex,
      weekday: getWeekdayName(currentIndex),
      darken: false,
      selected: false,
    };
    daysObject.push(dayObject);

    if (currentIndex === amountOfIndexesInAWeek) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
  }

  return daysObject;
};

const getRightDateIndex = (year, monthIndex) => {
  if (monthIndex > 11)
    return {
      year: year + 1,
      month: 0,
      day: null,
    };

  if (monthIndex < 0)
    return {
      year: year - 1,
      month: 11,
      day: null,
    };

  return {
    year,
    month: monthIndex,
    day: null,
  };
};

const getMonthByValues = (year, month) => {
  const date = new Date(year, month);

  const currentMonth = getMonth(date);
  const monthName = getMonthName(currentMonth);

  const daysInMonth = getDaysInMonth(date);
  const firstDayOfWeek = getDay(date);

  const daysOfTheMonthObjects = getDaysOfTheMonthObjects(
    daysInMonth,
    firstDayOfWeek
  );

  let monthObject = {
    year,
    month: currentMonth,
    monthName,
    days: daysOfTheMonthObjects,
  };

  return monthObject;
};

const calculateCalendar = (
  previousMonthObject,
  latestMonthObject,
  nextMonthObject
) => {
  const previousMonthDays = previousMonthObject.days;
  const latestMonthDays = latestMonthObject.days;
  const nextMonthDays = nextMonthObject.days;

  const latestMonthFirstDayIndex = latestMonthDays[0].weekIndex;

  const amountOfPreviousDaysInCalendar = 6 - (6 - latestMonthFirstDayIndex);
  const previousMonthDaysLength = previousMonthDays.length;
  const previousMonthDaysInCalendar = previousMonthDays
    .slice(
      previousMonthDaysLength - amountOfPreviousDaysInCalendar,
      previousMonthDaysLength
    )
    .map((dayObject) => {
      return {
        ...dayObject,
        darken: true,
      };
    });

  const calendarDays = [...previousMonthDaysInCalendar, ...latestMonthDays];

  let index = 0;
  while (calendarDays.length < 42) {
    const nextMonthDay = {
      ...nextMonthDays[index],
      darken: true,
    };

    calendarDays.push(nextMonthDay);
    index++;
  }

  return calendarDays;
};

const getCalendarDays = (year, month, day) => {
  const previousMonthValues = getRightDateIndex(year, month - 1, day);
  const nextMonthValues = getRightDateIndex(year, month + 1, day);

  const previousMonth = getMonthByValues(
    previousMonthValues.year,
    previousMonthValues.month
  );
  let latestMonth = getMonthByValues(year, month);

  const latestMonthDays = latestMonth.days.map((dayObject) => {
    if (dayObject.dayOfTheMonth === day) {
      return {
        ...dayObject,
        selected: true,
      };
    }
    return dayObject;
  });

  latestMonth = {
    ...latestMonth,
    days: latestMonthDays,
  };

  const nextMonth = getMonthByValues(
    nextMonthValues.year,
    nextMonthValues.month
  );

  const days = calculateCalendar(previousMonth, latestMonth, nextMonth);

  const calenderObject = {
    year,
    month,
    monthName: latestMonth.monthName,
    days,
  };

  return calenderObject;
};

const getCurrentDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return {
    day,
    month,
    year,
  };
};

export {
  getCalendarDays,
  getCurrentDate,
  getRightDateIndex,
  getMonthName,
  getShortenWeekdayNames,
  convertMinutesToTime,
};
