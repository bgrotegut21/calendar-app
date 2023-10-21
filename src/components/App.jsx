import '../styles/App.css';
import { getCurrentDate, getRightDateIndex } from '../scripts/dates.js';
import { data, createDefaultTask, reducer } from '../scripts/data.js';

import { useState, useReducer } from 'react';

import Nav from './Nav';
import Calendar from './Calendar';
import Tasks from './Tasks';
import SelectionBar from './SelectionBar';
import TaskPopup from './TaskPopup';
import Modal from './Modal';
import AccountPopup from './AccountPopup';
import AccountInfo from './AccountInfo';

function App() {
  const [status, setStatus] = useState('taskpopup');

  const [date, setDate] = useState(getCurrentDate);

  const [state, dispatch] = useReducer(reducer, data);
  const [showTaskAdder, setShowTaskAdder] = useState(true);
  const [taskid, setTaskId] = useState(null);
  const [modalMessage, setModalMessage] = useState(
    'Are you sure you want to delete your account?'
  );

  const selectionBarIsOpen = status === 'selectionbar';
  const taskPopupIsOpen = status === 'taskpopup';
  const modalIsOpen = status === 'modal';
  const accountPopupIsOpen = status === 'account';
  const accountInfoIsOpen = status === 'accountinfo';

  const overlayOpen =
    selectionBarIsOpen ||
    taskPopupIsOpen ||
    modalIsOpen ||
    accountPopupIsOpen ||
    accountInfoIsOpen;

  // console.log(taskPopupIsOpen, 'the task popup is open');

  const handlePreviousMonth = () => {
    const previousMonth = getRightDateIndex(date.year, date.month - 1);
    setDate(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = getRightDateIndex(date.year, date.month + 1);
    setDate(nextMonth);
  };

  //if the id is null it will still bring up the task popup however the taskpopup will add a
  //new task instead of editing an existing one
  const handleTaskPopup = (id) => {
    if (taskPopupIsOpen) return setStatus('normal');
    setTaskId(id);
    setStatus('taskpopup');
  };

  const handleAccount = () => {
    if (accountPopupIsOpen) return setStatus('normal');
    setStatus('account');
  };

  const handleAccountInfo = () => {
    if (accountInfoIsOpen) return setStatus('normal');
    setStatus('accountinfo');
  };

  const handleModal = (message) => {
    if (modalIsOpen || typeof message === 'undefined') {
      setStatus('normal');
      setModalMessage('');
      return;
    }
    setModalMessage(message);
    setStatus('modal');
  };

  const changeDay = (day) => {
    setDate({
      ...date,
      day,
    });
  };

  return (
    <div className="App">
      <div className={`overlay overlay-${overlayOpen ? 'visible' : ''}`}>
        overlay
      </div>

      <AccountPopup
        onAccountPopup={handleAccount}
        accountPopupIsOpen={accountPopupIsOpen}
      />

      <TaskPopup
        data={state}
        date={date}
        taskId={taskid}
        dispatch={dispatch}
        onTaskPopup={handleTaskPopup}
        taskPopupIsOpen={taskPopupIsOpen}
      />

      <AccountInfo
        onAccountInfo={handleAccountInfo}
        accountInfoIsOpen={accountInfoIsOpen}
      />

      <Modal
        message={modalMessage}
        onYes={handleModal}
        onNo={handleModal}
        modalIsOpen={modalIsOpen}
      />

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
        onTaskPopup={handleTaskPopup}
        onModal={handleModal}
        onSwitch={() => setShowTaskAdder(!showTaskAdder)}
      />

      <div className="main-section">
        <Calendar
          date={date}
          data={state}
          onLeftArrow={handlePreviousMonth}
          onRightArrow={handleNextMonth}
          changeDay={changeDay}
        />
        <Tasks
          data={state}
          date={date}
          dispatch={dispatch}
          onTaskPopup={handleTaskPopup}
          showTaskAdder={
            showTaskAdder &&
            !selectionBarIsOpen &&
            !modalIsOpen &&
            !accountPopupIsOpen &&
            !accountInfoIsOpen
          }
          isTaskPopup={taskPopupIsOpen}
        />
      </div>
    </div>
  );
}

export default App;
