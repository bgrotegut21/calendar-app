import '../styles/Month.css';

import PropTypes from 'prop-types';
import { getCalendarDays, getShortenWeekdayNames } from '../scripts/dates';
import { filterDataByDate } from '../scripts/data';

const weekdays = getShortenWeekdayNames();

const Day = ({ day, data, onClick }) => {
  const dayClassState = day.darken
    ? 'day-darken'
    : day.selected
    ? 'day-selected'
    : 'day';
  const dayClassToday = day.today ? 'day-today' : '';
  const dayClassName = `${dayClassState} ${dayClassToday}`;
  let markedClassName = '';

  if (!day.darken) {
    const dateObject = {
      year: day.year,
      month: day.monthIndex,
      day: day.dayOfTheMonth,
    };

    const markedArray = filterDataByDate(data, dateObject);
    if (markedArray.length > 0) markedClassName = 'marked';
    if (markedArray.length > 0 && day.selected)
      markedClassName = 'markedselected';
  }

  return (
    <button
      className={dayClassName}
      disabled={day.darken}
      onClick={() => {
        // console.log(day.dayOfTheMonth, 'the current day');
        // console.log(data, 'the current data state');

        onClick();
      }}
    >
      {day.dayOfTheMonth}
      <div className={`day-marking day-marking-${markedClassName}`}>marked</div>
    </button>
  );
};

Day.propTypes = {
  day: PropTypes.shape({
    darken: PropTypes.bool,
    selected: PropTypes.bool,
    dayOfTheMonth: PropTypes.number,
    weekIndex: PropTypes.number,
    weekDay: PropTypes.string,
    today: PropTypes.bool,
    year: PropTypes.number,
    monthIndex: PropTypes.number,
  }),
  data: PropTypes.array,
  onClick: PropTypes.func,
};

const Month = ({ date, data, changeDay }) => {
  const currentCalendar = getCalendarDays(date.year, date.month, date.day);
  console.log(data, 'the current data');

  return (
    <div className="month">
      <div className="weekday-container">
        {weekdays.map((weekday) => (
          <div key={weekday} className="weekday">
            <p>{weekday}</p>
          </div>
        ))}
      </div>

      <div className="month-container">
        {currentCalendar.days.map((day, index) => {
          return (
            <Day
              key={index}
              day={day}
              onClick={() => changeDay(day.dayOfTheMonth)}
              data={data}
            />
          );
        })}
      </div>
    </div>
  );
};

Month.propTypes = {
  data: PropTypes.array,
  date: PropTypes.shape({
    month: PropTypes.number,
    year: PropTypes.number,
    day: PropTypes.number,
  }),
  changeDay: PropTypes.func,
};

export default Month;
