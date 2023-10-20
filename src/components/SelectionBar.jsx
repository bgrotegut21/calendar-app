import '../styles/SelectionBar.css';

import accountIcon from '../../public/images/account-icon.svg';
import logoutIcon from '../../public/images/logout.svg';
import refreshIcon from '../../public/images/refresh.svg';
import trashIcon from '../../public/images/trash.svg';
import addIcon from '../../public/images/add.svg';

import plusOnIcon from '../../public/images/plusOn.svg';
import plusOffIcon from '../../public/images/plusOff.svg';

import PropTypes from 'prop-types';
import { useState } from 'react';

import Switch from './Switch';

const Item = ({ icon, text, onClick }) => {
  const [hovering, setHovering] = useState('');

  return (
    <div className="item">
      <button
        onMouseEnter={() => setHovering('hovering')}
        onMouseLeave={() => setHovering('')}
        onClick={onClick}
        className="item-trigger-button"
      >
        item trigger button
      </button>
      <img
        className={`selectionbar-icon selectionbar-icon-${hovering}`}
        src={icon}
        alt={text}
      />
      <p className={`selectionbar-text selectionbar-text-${hovering}`}>
        {text}
      </p>
    </div>
  );
};

Item.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.node,
  onClick: PropTypes.func,
};

const ExitButton = ({ onClose }) => {
  const [hovering, setHovering] = useState('');

  return (
    <div className="close-button-container">
      <button
        className={`close-button close-button-${hovering}`}
        onMouseEnter={() => setHovering('hovering')}
        onMouseLeave={() => setHovering('')}
        onClick={onClose}
      >
        X
      </button>
    </div>
  );
};
ExitButton.propTypes = {
  onClose: PropTypes.func,
};

const SelectionBar = ({ isOpen, onClose, onSwitch, onTaskPopup, onModal }) => {
  return (
    <div className={`selectionbar selectionbar-${isOpen ? 'visible' : ''}`}>
      <div className="top-row">
        <ExitButton onClose={onClose} />

        <div className="switch-container">
          <img className="switch-icon" src={plusOnIcon} alt="plus button on" />

          <Switch onSwitch={onSwitch} />

          <img
            className="switch-icon"
            src={plusOffIcon}
            alt="plus button off"
          />
        </div>
      </div>
      <Item icon={accountIcon} text="Account" />
      <Item
        icon={logoutIcon}
        text="Logout"
        onClick={() => onModal('Are you sure you want to logout?')}
      />
      <Item
        icon={trashIcon}
        text="Delete Account"
        onClick={() => onModal('Are you sure you want to delete your account?')}
      />
      <Item
        icon={refreshIcon}
        text="Reset Data"
        onClick={() => onModal('Are you sure you want to reset your data?')}
      />
      <Item icon={addIcon} text="Add Item" onClick={() => onTaskPopup(null)} />
    </div>
  );
};

SelectionBar.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  onSwitch: PropTypes.func,
  onTaskPopup: PropTypes.func,
  onModal: PropTypes.func,
};

export default SelectionBar;
