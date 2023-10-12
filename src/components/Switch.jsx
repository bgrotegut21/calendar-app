import '../styles/Switch.css';

import { useState } from 'react';
import PropTypes from 'prop-types';

const Switch = ({ onSwitch }) => {
  const [isOn, setIsOn] = useState(false);
  const [deounce, setDebounce] = useState(false);

  const handleSwitch = () => {
    if (deounce) return;
    setDebounce(true);
    setIsOn(!isOn);
    onSwitch();

    setTimeout(() => {
      setDebounce(false);
    }, 500);
  };

  return (
    <div className="switch">
      <button className="switch-triggerbutton" onClick={handleSwitch}></button>
      <div className={`switchball switchball-${isOn ? 'on' : 'off'}`}></div>
    </div>
  );
};

Switch.propTypes = {
  onSwitch: PropTypes.func,
};

export default Switch;
