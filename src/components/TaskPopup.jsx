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
}) => {
  const [tempState, setTempState] = useState({});
  const [applied, setApplied] = useState(false);

  const editedTask = filterDataById(data, taskId);
  const isEdit = editedTask !== null;

  const id = isEdit ? editedTask.id : null;
  let action = isEdit ? 'update' : 'add';

  // console.log(isEdit, 'the is edit');

  // console.log(startTime, 'the start time');
  // console.log(endTime, 'the end time');

  const startMillitaryTime = convertMinutesToTime(startTime, true);
  const endMillitaryTime = convertMinutesToTime(endTime, true);

  console.log(startMillitaryTime, 'the start millitary time');
  console.log(endMillitaryTime, 'the end millitary time');

  const dateISO = convertDateToISO(latestDate);
  const active = taskPopupIsOpen ? 'active' : '';

  if (!taskPopupIsOpen) {
  }

  if (taskPopupIsOpen) {
    if (isEdit) {
      if (!applied) {
      }
    }
  }

  //deals with color state chang
  const blueSelected = colorState === 'blue' ? 'selected' : '';
  const redSelected = colorState === 'red' ? 'selected' : '';
  const yellowSelected = colorState === 'yellow' ? 'selected' : '';

  const messageIsToLong = taskpopupTextLength > 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());

    // console.log(formDataObject, 'the form data object');

    const { startMillitaryTime, endMillitaryTime, dateISO, text } =
      formDataObject;

    // console.log(dateISO, 'the curreny date iso');

    const startTime = convertTimeToMinutes(startMillitaryTime);
    const endTime = convertTimeToMinutes(endMillitaryTime);

    const startTimeString = convertMinutesToTime(startTime, false);
    const endTimeString = convertMinutesToTime(endTime, false);

    let latestDate = new Date(dateISO);
    latestDate = new Date(
      latestDate.getTime() + latestDate.getTimezoneOffset() * 60000
    );

    const dateObject = convertDateToObject(latestDate);

    const { month, year, day } = dateObject;

    dispatch({
      type: action,
      payload: {
        text,
        color: colorState,
        month,
        day,
        year,
        startTime,
        endTime,
        startTimeString,
        endTimeString,
        id,
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
        <form
          className="taskpopup-form-data"
          onSubmit={handleSubmit}
          method="POST"
        >
          <h2>Task</h2>
          <input
            name="text"
            className="task-popup-textbox"
            onChange={(e) => {
              setTaskpopupTextLength(e.target.value.length);
            }}
            defaultValue={text}
            key={text}
            placeholder="Enter task here"
          />
          <h2>Color</h2>
          <div className="task-popup-colors">
            <button
              type="button"
              className={`color color-red color-${redSelected}`}
              onClick={() => setColorState('red')}
            >
              red
            </button>
            <button
              type="button"
              className={`color color-blue color-${blueSelected}`}
              onClick={() => setColorState('blue')}
            >
              blue
            </button>
            <button
              type="button"
              className={`color color-yellow color-${yellowSelected}`}
              onClick={() => setColorState('yellow')}
            >
              yellow
            </button>
          </div>

          <h2>Date</h2>
          <input
            type="date"
            name="dateISO"
            className="task-popup-date"
            defaultValue={dateISO}
            key={dateISO}
          />

          <h2>Time</h2>

          <div className="task-popup-times">
            <input
              className="task-popup-time"
              type="time"
              name="startMillitaryTime"
              defaultValue={startMillitaryTime}
              key={startMillitaryTime}
            />
            <p>to</p>
            <input
              name="endMillitaryTime"
              className="task-popup-time"
              type="time"
              defaultValue={endMillitaryTime}
              key={endMillitaryTime}
            />
          </div>

          <button
            type="submit"
            disabled={messageIsToLong}
            className="task-popup-addbutton"
          >
            {isEdit ? 'Update' : 'Add'}
          </button>
          <p className="error-message">
            {messageIsToLong && '⚠️ Message cannot be over 50 characters.'}
          </p>
        </form>
      </div>
    </div>
  );
};

TaskPopup.propTypes = {
  taskData: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    month: PropTypes.number,
    day: PropTypes.number,
    year: PropTypes.number,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    startTimeString: PropTypes.string,
    endTimeString: PropTypes.string,
    id: PropTypes.string,
  }),
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
};

export default TaskPopup;
