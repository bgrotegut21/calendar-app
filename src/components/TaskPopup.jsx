import '../styles/TaskPopup.css';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { filterDateById } from '../scripts/data.js';
import {
  convertMinutesToTime,
  converTimeToMinutes,
  convertDateToObject,
  convertObjectToDate,
  converDateToISO,
} from '../scripts/dates';

const TaskPopup = ({ data, date, taskId, dispatch, onTaskPopup }) => {
  const editedTask = filterDateById(data, taskId);
  const isEdit = editedTask !== null;

  const defaultStartTimeString = isEdit
    ? convertMinutesToTime(editedTask.startTime, true)
    : '00:00';
  const defaultEndTimeString = isEdit
    ? convertMinutesToTime(editedTask.endTime, true)
    : '00:00';

  const defaultStartTime = isEdit ? editedTask.startTime : 0;
  const defaultEndTime = isEdit ? editedTask.endTime : 1380;

  const defaultTaskText = isEdit ? editedTask.text : '';
  const defaultColor = isEdit ? editedTask.color : 'red';
  const defaultId = isEdit ? editedTask.id : null;

  let action = isEdit ? 'update' : 'add';

  const [currentData, setCurrentData] = useState({
    text: defaultTaskText,
    color: defaultColor,
    startTime: defaultStartTime,
    endTime: defaultEndTime,
    startTimeString: defaultStartTimeString,
    endTimeString: defaultEndTimeString,
    id: defaultId,
    year: date.year,
    month: date.month,
    day: date.day !== null ? date.day : 1,
  });

  const startMillitaryTime = convertMinutesToTime(currentData.startTime, true);
  const endMillitaryTime = convertMinutesToTime(currentData.endTime, true);

  const latestDate = {
    year: currentData.year,
    month: currentData.month,
    day: currentData.day,
  };

  console.log(latestDate, 'the latest date');

  const dateISO = converDateToISO(latestDate);

  const handleTime = (e, isStartTime) => {
    const minutes = converTimeToMinutes(e.target.value);
    const time = convertMinutesToTime(minutes, false);

    let presentData;

    if (isStartTime) {
      presentData = {
        ...currentData,
        startTime: minutes,
        startTimeString: time,
      };

      setCurrentData(presentData);
      return;
    }

    presentData = {
      ...currentData,
      endTime: minutes,
      endTimeString: time,
    };

    setCurrentData(presentData);
  };

  return (
    <div className="task-popup-container">
      <div className="task-popup">
        <button className="popup-exit-button">X</button>
        <h2>Task</h2>
        <input
          className="task-popup-textbox"
          value={currentData.text}
          onChange={(e) =>
            setCurrentData({
              ...currentData,
              text: e.target.value,
            })
          }
        />
        <h2>Color</h2>
        <div className="task-popup-colors">
          <button
            className="color color-red"
            onClick={() => setCurrentData({ ...currentData, color: 'red ' })}
          >
            red
          </button>
          <button
            className="color color-blue"
            onClick={() => setCurrentData({ ...currentData, color: 'blue' })}
          >
            blue
          </button>
          <button
            className="color color-yellow"
            onClick={() => setCurrentData({ ...currentData, color: 'yellow' })}
          >
            yellow
          </button>
        </div>

        <h2>Date</h2>
        <input
          type="date"
          className="task-popup-date"
          value={dateISO}
          onChange={(e) => {
            const date = new Date(e.target.value);
            const dateObject = convertDateToObject(date);
            setCurrentData({
              ...currentData,
              ...dateObject,
            });
          }}
        />

        <h2>Time</h2>

        <div className="task-popup-times">
          <input
            className="task-popup-time"
            type="time"
            value={startMillitaryTime}
            onChange={(e) => handleTime(e, true)}
          />
          <p>to</p>
          <input
            className="task-popup-time"
            type="time"
            value={endMillitaryTime}
            onChange={(e) => handleTime(e, false)}
          />
        </div>

        <button className="task-popup-addbutton">
          {isEdit ? 'Update' : 'Add'}
        </button>
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
  onTaskPopup: PropTypes.func,
};

export default TaskPopup;
