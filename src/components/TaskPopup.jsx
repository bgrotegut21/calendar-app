import '../styles/TaskPopup.css';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { filterDateById } from '../scripts/data.js';
import { convertMinutesToTime, convertDateToObject } from '../scripts/dates';

const TaskPopup = ({ data, date, taskId, dispatch }) => {
  const editedTask = filterDateById(data, taskId);
  const isEdit = editedTask !== null;

  let defaultDate = new Date(date.year, date.month, date.day);
  if (isEdit)
    defaultDate = new Date(editedTask.year, editedTask.month, editedTask.day);

  const defaultDateString = defaultDate.toDateString();

  const defaultDateObject = 2;

  let defaultStartTimeString = isEdit
    ? convertMinutesToTime(editedTask.startTime, true)
    : '00:00';
  let defaultEndTimeString = isEdit
    ? convertMinutesToTime(editedTask.endTime, true)
    : '00:00';

  let defaultStartTime = isEdit ? editedTask.startTime : 0;
  let defaultEndTime = isEdit ? editedTask.endTime : 1440;

  let defaultTaskText = isEdit ? editedTask.text : '';
  let defaultColor = isEdit ? editedTask.color : 'red';
  let action = isEdit ? 'update' : 'add';
  let defaultId = isEdit ? editedTask.id : null;

  const [currentData, setCurrentData] = useState({
    text: defaultTaskText,
    color: defaultColor,
    startTime: defaultStartTime,
    endTime: defaultEndTime,
    startTimeString: defaultStartTimeString,
    endTimeString: defaultEndTimeString,
    id: defaultId,
  });

  return (
    <div className="task-popup">
      <h2>Task</h2>
      <input
        className="task-popup-textbox"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <h2>Color</h2>
      <div className="task-popup-colors">
        <button className="color color-red">red</button>
        <button className="color color-blue">blue</button>
        <button className="color color-yellow">yellow</button>
      </div>

      <h2>Date</h2>
      <input type="date" className="task-popup-date" />

      <h2>Time</h2>

      <div className="task-popup-times">
        <input className="task-popup-time" type="time" />
        <p>to</p>
        <input className="task-popup-time" type="time" />
      </div>

      <button>{isEdit ? 'Update' : 'Add'}</button>
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
};

export default TaskPopup;
