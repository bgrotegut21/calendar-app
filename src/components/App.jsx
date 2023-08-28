import '../styles/App.css';
import { getCurrentDate, getRightDateIndex } from '../scripts/dates.js';
import { data, createDefaultTask, reducer } from '../scripts/data.js';

import { useState, useReducer } from 'react';

import Nav from './Nav';
import Calendar from './Calendar';
import Tasks from './Tasks';
import SelectionBar from './SelectionBar';
import TaskPopup from './TaskPopup';

function App() {
  const [status, setStatus] = useState('taskpopup');

  const [date, setDate] = useState(getCurrentDate);
  const [state, dispatch] = useReducer(reducer, data);
  const [showTaskAdder, setShowTaskAdder] = useState(true);
  const [taskid, setTaskId] = useState(null);

  const selectionBarIsOpen = status === 'selectionbar';
  const taskPopupIsOpen = status === 'taskpopup' || status === 'taskpopupEdit';
  console.log(taskPopupIsOpen, 'the task popup is open');


  const handlePreviousMonth = () => {
    const previousMonth = getRightDateIndex(date.year, date.month - 1);
    setDate(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = getRightDateIndex(date.year, date.month + 1);
    setDate(nextMonth);
  };

  const handleTaskPopup = (id) => {
    setStatus('taskpopup');
    setTaskId(id);
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

      {taskPopupIsOpen && (
        <TaskPopup
          data={state}
          date={date}
          taskId={taskid}
          dispatch={dispatch}
        />
      )}

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
        onSwitch={() => setShowTaskAdder(!showTaskAdder)}
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
          date={date}
          dispatch={dispatch}
          isTaskPopup={taskPopupIsOpen}
          onTaskPopup={handleTaskPopup}
          showTaskAdder={showTaskAdder}
        />
      </div>
    </div>
  );
}

export default App;
