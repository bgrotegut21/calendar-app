import '../styles/TaskAdder.css';

import { useState } from 'react';
import PropTypes from 'prop-types';

const TaskAdder = ({ isTaskPopup, onTaskPopup }) => {
  // console.log(onTaskPopup, 'the on task popup');
  const [debounce, setDebounce] = useState(true);

  let animation = '';
  if (isTaskPopup) animation = 'animation';

  return (
    <div className="taskadder">
      <button
        className="taskadder-triggerbutton"
        onClick={() => {
          if (debounce === true) {
            setDebounce(false);
            onTaskPopup();

            setTimeout(() => {
              setDebounce(true);
            }, 500);
          }
        }}
      ></button>

      <div className="taskadder-container">
        <div className={`task-line1 task-line1-${animation}`}></div>
        <div className={`task-line2 task-line2-${animation}`}></div>
      </div>
    </div>
  );
};

TaskAdder.propTypes = {
  onTaskPopup: PropTypes.func,
  isTaskPopup: PropTypes.bool,
};

export default TaskAdder;
