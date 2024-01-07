import '../styles/Nav.css';
import calenderIcon from '../images/calendar.svg';

import PropTypes from 'prop-types';

const Nav = ({ onOpen }) => {
  return (
    <nav className="Navigation">
      <div className="hamburger-container">
        <div className="hamburger-button">
          <button className="trigger-button" onClick={onOpen}>
            Open Sidebar
          </button>
          <div className="lines">
            <div className="line line1"> </div>
            <div className="line line2"></div>
            <div className="line line3"></div>
          </div>
        </div>
      </div>
      <div className="logo-and-title">
        <img className="cal-icon" src={calenderIcon} alt="calendar icon" />
        <h1 className="calendar-title">Shift Sumo</h1>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  onOpen: PropTypes.func,
};

export default Nav;
