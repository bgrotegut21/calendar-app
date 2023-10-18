import { getMonth, getDaysInMonth, getDay, formatISO } from 'date-fns';

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

const convertMinutesToTime = (minutes, millitaryTime) => {
  if (minutes > 1439) throw new Error('Minutes cannot be greater than 1439');

  let sign = 'AM';
  let minutesLeft = minutes % 60;
  let hours = (minutes - minutesLeft) / 60;

  if (!millitaryTime) {
    if (hours >= 12) {
      sign = 'PM';
      hours = hours > 12 ? (hours -= 12) : hours;
    }
    if (hours === 0) {
      hours = 12;
      sign = 'AM';
    }
  }

  // console.log(hours, 'the hours');
  // console.log(minutesLeft, 'the minutes left');

  let hoursString = String(hours);
  let minutesString = String(minutesLeft);

  if (hoursString.length === 1) hoursString = `0${hoursString}`;
  if (minutesString.length === 1) minutesString = `0${minutesString}`;

  if (!millitaryTime) return `${hoursString}:${minutesString} ${sign}`;
  return `${hoursString}:${minutesString}`;
};

const convertTimeToMinutes = (millitaryTime) => {
  const splitTime = millitaryTime.split(':');
  const hours = Number(splitTime[0]);
  const minutes = Number(splitTime[1]);

  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
};

const getDaysOfTheMonthObjects = (
  amountOfDays,
  firstDayOfWeek,
  monthIndex,
  year
) => {
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
      today: false,
      monthIndex,
      year,
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
    firstDayOfWeek,
    currentMonth,
    year
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

const markToday = (calendarObject) => {
  const today = getCurrentDate();

  if (today.month !== calendarObject.month) return calendarObject;
  if (today.year !== calendarObject.year) return calendarObject;

  const days = calendarObject.days.map((dayObject) => {
    if (dayObject.dayOfTheMonth === today.day) {
      return {
        ...dayObject,
        today: true,
      };
    }
    return dayObject;
  });

  return {
    ...calendarObject,
    days,
  };
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

  const calendarObject = {
    year,
    month,
    monthName: latestMonth.monthName,
    days,
  };

  const filteredCalendarObject = markToday(calendarObject);

  // console.log(filteredCalendarObject, 'the filtered calendar object');

  return filteredCalendarObject;
};

const convertObjectToDate = (dateObject) => {
  const { day, month, year } = dateObject;
  const latestDay = day === null ? 1 : day;

  // console.log(dateObject, 'the current date object');

  let date = new Date(year, month, latestDay);
  return date;
};

const convertDateToISO = (dateObject) => {
  const date = convertObjectToDate(dateObject);
  return formatISO(date, { representation: 'date' });
};

const convertDateToObject = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

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
  convertDateToObject,
  convertObjectToDate,
  convertDateToISO,
  convertTimeToMinutes,
};
