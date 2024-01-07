import '../styles/AccountPopup.css';

import signInIcon from '../images/signInIcon.svg';
import calendarIcon from '../images/calendar.svg';

import PropTypes from 'prop-types';

const SignInButton = ({ onSignIn }) => {
  return (
    <div className="signin-button-container">
      <button className="signin-button" onClick={onSignIn}></button>

      <img className="signin-icon" src={signInIcon} />
      <p className="signin-text">Sign In With Google</p>
    </div>
  );
};

SignInButton.propTypes = {
  onSignIn: PropTypes.func,
};

const AccountPopup = ({ onAccountPopup, accountPopupIsOpen }) => {
  const active = accountPopupIsOpen ? 'active' : '';

  return (
    <div
      className={`account-popup-container account-popup-container-${active}`}
    >
      <div className={`account-popup account-popup-${active}`}>
        <div className="account-info-container">
          <img className="account-calendar-logo" src={calendarIcon} />
          <h1>Shift Sumo</h1>
        </div>

        <div className="account-text-container">
          <p className="account-welcome-text">
            Shift Sumo is an online calendar that allows you to plan your day
            with ease. No extra complexity, just a plain old calendar with
            tasks.
          </p>
        </div>

        <h2>Login to Get Started</h2>
        <SignInButton onSignIn={onAccountPopup} />
        <p className="account-error-message"></p>
      </div>
    </div>
  );
};

AccountPopup.propTypes = {
  onAccountPopup: PropTypes.func,
  accountPopupIsOpen: PropTypes.bool,
};

export default AccountPopup;
