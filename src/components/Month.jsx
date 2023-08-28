import '../styles/Month.css';

import PropTypes from 'prop-types';
import { getCalendarDays, getShortenWeekdayNames } from '../scripts/dates';

const weekdays = getShortenWeekdayNames();

const Day = ({ day, onClick }) => {
  return (
    <button
      className={
        day.selected ? 'day-selected' : day.darken ? 'day-darken' : 'day'
      }
      disabled={day.darken}
      onClick={onClick}
    >
      {day.dayOfTheMonth}
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
  }),
  onClick: PropTypes.func,
};

const Month = ({ date,  changeDay }) => {
  const currentCalendar = getCalendarDays(date.year, date.month, date.day);
  console.log(currentCalendar);
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
