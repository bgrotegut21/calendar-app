import '../styles/TaskPopup.css';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { filterDataById } from '../scripts/data.js';
import {
  convertMinutesToTime,
  convertTimeToMinutes,
  convertDateToObject,
  convertObjectToDate,
  convertDateToISO,
} from '../scripts/dates';

const TaskPopup = ({
  data,
  date,
  taskId,
  dispatch,
  taskPopupIsOpen,
  onTaskPopup,
  changeDay,
}) => {
  const defaultTaskState = {
    text: '',
    color: 'blue',
    month: date.month,
    day: date.day,
    year: date.year,
    startTime: 0,
    endTime: 1439,
  };

  const [tempTask, setTempTask] = useState(defaultTaskState);
  const [applied, setApplied] = useState(false);

  const editedTask = filterDataById(data, taskId);
  const isEdit = editedTask !== null;

  const id = isEdit ? editedTask.id : null;
  const action = isEdit ? 'update' : 'add';

  const startMillitaryTime = convertMinutesToTime(tempTask.startTime, true);
  const endMillitaryTime = convertMinutesToTime(tempTask.endTime, true);

  // console.log(startMillitaryTime, 'the start millitary time');
  // console.log(endMillitaryTime, 'the end millitary time');

  // console.log(defaultTaskState, 'the default task state');

  const latestDate = {
    month: tempTask.month,
    day: tempTask.day,
    year: tempTask.year,
  };

  // console.log(latestDate, 'the latest date');
  const dateISO = convertDateToISO(latestDate);
  // console.log(dateISO, 'the date iso');

  const active = taskPopupIsOpen ? 'active' : '';

  const checkDateDifference = () => {
    if (
      latestDate.month !== date.month ||
      latestDate.day !== date.day ||
      latestDate.year !== date.year
    ) {
      return true;
    }
    return false;
  };

  if (!taskPopupIsOpen) {
    const isDifferent = checkDateDifference();

    if (isDifferent) {
      setTempTask({
        ...defaultTaskState,
        month: date.month,
        day: date.day,
        year: date.year,
      });
    }

    if (applied) {
      setTempTask({
        ...defaultTaskState,
        month: date.month,
        day: date.day,
        year: date.year,
      });
      setApplied(false);
    }
  }

  if (taskPopupIsOpen) {
    if (isEdit && !applied) {
      setTempTask(editedTask);
      setApplied(true);
    }
  }

  //deals with color state chang
  const blueSelected = tempTask.color === 'blue' ? 'selected' : '';
  const redSelected = tempTask.color === 'red' ? 'selected' : '';
  const yellowSelected = tempTask.color === 'yellow' ? 'selected' : '';

  const messageIsToLong = tempTask.text.length > 50;

  const handleSubmit = () => {
    let tempTaskDay = tempTask.day;

    if (tempTask.day === null) {
      tempTaskDay = 1;
      changeDay(1);
    }

    dispatch({
      type: action,
      payload: {
        ...tempTask,
        day: tempTaskDay,
        startTimeString: convertMinutesToTime(tempTask.startTime),
        endTimeString: convertMinutesToTime(tempTask.endTime),
        id: id,
      },
    });
    onTaskPopup(null);
  };

  return (
    <div className={`task-popup-container task-popup-container-${active}`}>
      <div className={`task-popup task-popup-${active}`}>
        <button className="popup-exit-button" onClick={() => onTaskPopup(null)}>
          X
        </button>

        <h2>Task</h2>
        <input
          name="text"
          className="task-popup-textbox"
          value={tempTask.text}
          onChange={(e) => {
            setTempTask({ ...tempTask, text: e.target.value });
          }}
          placeholder="Enter task here"
        />
        <h2>Color</h2>
        <div className="task-popup-colors">
          <button
            type="button"
            className={`color color-red color-${redSelected}`}
            onClick={() => setTempTask({ ...tempTask, color: 'red' })}
          >
            red
          </button>
          <button
            type="button"
            className={`color color-blue color-${blueSelected}`}
            onClick={() => setTempTask({ ...tempTask, color: 'blue' })}
          >
            blue
          </button>
          <button
            type="button"
            className={`color color-yellow color-${yellowSelected}`}
            onClick={() => setTempTask({ ...tempTask, color: 'yellow' })}
          >
            yellow
          </button>
        </div>

        <h2>Date</h2>
        <input
          type="date"
          name="dateISO"
          className="task-popup-date"
          value={dateISO}
          onChange={(e) => {
            const rawDate = new Date(e.target.value);
            const currentDate = new Date(
              rawDate.getTime() + Math.abs(rawDate.getTimezoneOffset() * 60000)
            );

            const dateObject = convertDateToObject(currentDate);
            setTempTask({ ...tempTask, ...dateObject });
          }}
        />

        <h2>Time</h2>

        <div className="task-popup-times">
          <input
            className="task-popup-time"
            type="time"
            name="startMillitaryTime"
            value={startMillitaryTime}
            onChange={(e) => {
              const startMinutes = convertTimeToMinutes(e.target.value);
              setTempTask({ ...tempTask, startTime: startMinutes });
            }}
          />
          <p>to</p>
          <input
            name="endMillitaryTime"
            className="task-popup-time"
            type="time"
            value={endMillitaryTime}
            onChange={(e) => {
              const endMinutes = convertTimeToMinutes(e.target.value);
              setTempTask({ ...tempTask, endTime: endMinutes });
            }}
          />
        </div>

        <button
          disabled={messageIsToLong}
          className="task-popup-addbutton"
          onClick={handleSubmit}
        >
          {isEdit ? 'Update' : 'Add'}
        </button>
        <p className="error-message">
          {messageIsToLong && '⚠️ Message cannot be over 50 characters.'}
        </p>
      </div>
    </div>
  );
};

TaskPopup.propTypes = {
  date: PropTypes.shape({
    month: PropTypes.number,
    day: PropTypes.number,
    year: PropTypes.number,
  }),
  data: PropTypes.array,
  taskId: PropTypes.string,
  dispatch: PropTypes.func,
  taskPopupIsOpen: PropTypes.bool,
  onTaskPopup: PropTypes.func,
  changeDay: PropTypes.func,
};

export default TaskPopup;
