import PropTypes from 'prop-types';

import '../styles/Calendar.css';
import { getMonthName } from '../scripts/dates';

import { useState } from 'react';

import MonthlyNav from './MonthlyNav';
import Month from './Month';

const Calendar = ({ date, data, onLeftArrow, onRightArrow, changeDay }) => {
  console.log(date, 'the current date');

  const monthName = getMonthName(date.month);
  const yearString = String(date.year);

  return (
    <div className="calendar">
      <MonthlyNav
        month={monthName}
        year={yearString}
        onRightArrow={onRightArrow}
        onLeftArrow={onLeftArrow}
      />
      <Month date={date} data={[]} changeDay={changeDay} />
    </div>
  );
};

Calendar.propTypes = {
  data: PropTypes.array,
  date: PropTypes.shape({
    month: PropTypes.number,
    year: PropTypes.number,
    day: PropTypes.number,
  }),
  onLeftArrow: PropTypes.func,
  onRightArrow: PropTypes.func,
  changeDay: PropTypes.func,
};
export default Calendar;
