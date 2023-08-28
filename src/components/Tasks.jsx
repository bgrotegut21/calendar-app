import '../styles/Tasks.css';
import PropTypes from 'prop-types';

import trashIcon from '../../public/images/trash.svg';
import editIcon from '../../public/images/edit.svg';

import { useState } from 'react';
import { filterDataByDate } from '../scripts/data.js';

const IconButton = ({ icon, alt, onClick }) => {
  return (
    <img className="icon-imagebutton" onClick={onClick} src={icon} alt={alt} />
  );
};

IconButton.propTypes = {
  icon: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

const Task = ({ taskData, onEdit, onDelete }) => {
  // console.log(onEdit, 'the on edit');
  // console.log(onDelete, 'the on delete');
  return (
    <div className="task-item">
      <div className="task-times">
        <p className="time-text">{taskData.startTimeString}</p>
        <p className="time-text">{taskData.endTimeString}</p>
      </div>

      <div className="task-item-line"></div>

      <div className="task-item-info">
        <p className="task-item-info-text">{taskData.text}</p>
      </div>

      <div className="task-item-events">
        <IconButton
          icon={editIcon}
          alt="edit"
          onClick={() => onEdit(taskData.id)}
        />
        <IconButton icon={trashIcon} alt="delete" onClick={onDelete} />
      </div>
    </div>
  );
};

Task.propTypes = {
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
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

const Tasks = ({
  data,
  date,
  dispatch,
  showTaskAdder,
  isTaskPopup,
  onTaskPopup,
}) => {
  const animation = isTaskPopup ? 'animation' : '';
  const currentData = filterDataByDate(data, date);

  const handleDelete = (id) => {
    dispatch({ type: 'delete', id });
  };

  // console.log(handleDelete, 'the handle delete');

  return (
    <div className="tasks">
      {showTaskAdder && (
        <div className="taskadder">
          <button
            className="taskadder-triggerbutton"
            onClick={() => onTaskPopup(null)}
          ></button>

          <div className="taskadder-container">
            <div className={`task-line1 task-line1-${animation}`}></div>
            <div className={`task-line2 task-line2-${animation}`}></div>
          </div>
        </div>
      )}

      <div className="task-list">
        {currentData.map((taskData) => (
          <Task
            key={taskData.id}
            taskData={taskData}
            onEdit={onTaskPopup}
            onDelete={() => handleDelete(taskData.id)}
          />
        ))}
      </div>
    </div>
  );
};

Tasks.propTypes = {
  date: PropTypes.shape({
    month: PropTypes.number,
    year: PropTypes.number,
    day: PropTypes.number,
  }),
  data: PropTypes.array,
  dispatch: PropTypes.func,
  onTaskPopup: PropTypes.func,
  isTaskPopup: PropTypes.bool,
  showTaskAdder: PropTypes.bool,
  onEdit: PropTypes.func,
  isTaskAdderButton: PropTypes.bool,
};
export default Tasks;
