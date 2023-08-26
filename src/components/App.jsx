import '../styles/App.css';
import { getCurrentDate, getRightDateIndex } from '../scripts/dates.js';
import { data, createDefaultTask, reducer } from '../scripts/data.js';

import { useState, useReducer } from 'react';

import Nav from './Nav';
import Calendar from './Calendar';
import Tasks from './Tasks';
import SelectionBar from './SelectionBar';

function App() {
  const [status, setStatus] = useState('normal');

  const [date, setDate] = useState(getCurrentDate);
  const [state, dispatch] = useReducer(reducer, data);

  const selectionBarIsOpen = status === 'selectionbar';
  const taskPopupIsOpen = status === 'taskpopup' || status === 'taskpopupEdit';
  console.log(taskPopupIsOpen, 'the task popup is open');

  const actionStatus =
    status === 'taskpopup'
      ? 'add'
      : status === 'taskpopupEdit'
      ? 'update'
      : 'normal';

  const handlePreviousMonth = () => {
    const previousMonth = getRightDateIndex(date.year, date.month - 1);
    setDate(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = getRightDateIndex(date.year, date.month + 1);
    setDate(nextMonth);
  };

  const handleTaskPopup = () => {
    const latestStatus =
      status === 'taskpopup' || status === 'taskpopupEdit'
        ? 'normal'
        : 'taskpopup';

    setStatus(latestStatus);
  };

  const handleTaskEdit = () => {
    const latestStatus =
      status === 'taskpopupEdit' ? 'normal' : 'taskpopupEdit';
    setStatus(latestStatus);
  };

  const changeDay = (day) => {
    setDate({
      ...date,
      day,
    });
  };

  return (
    <div className="App">
      <div
        className={`overlay overlay-${
          selectionBarIsOpen || taskPopupIsOpen ? 'visible' : ''
        }`}
      >
        overlay
      </div>

      <Nav
        onOpen={() => {
          setStatus('selectionbar');
        }}
      />
      <SelectionBar
        isOpen={selectionBarIsOpen}
        onClose={() => {
          setStatus('normal');
        }}
      />

      <div className="main-section">
        <Calendar
          date={date}
          data={data}
          onLeftArrow={handlePreviousMonth}
          onRightArrow={handleNextMonth}
          changeDay={changeDay}
        />
        <Tasks
          data={state}
          dispatch={dispatch}
          isTaskPopup={taskPopupIsOpen}
          onTaskPopup={handleTaskPopup}
          onEdit={handleTaskEdit}
        />
      </div>
    </div>
  );
}

export default App;
