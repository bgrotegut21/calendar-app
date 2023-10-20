import '../styles/AccountInfo.css';
import PropTypes from 'prop-types';

const AccountInfo = ({ onAccountInfo, accountInfoIsOpen }) => {
  const active = accountInfoIsOpen ? 'active' : '';

  return (
    <div
      className={`account-details-container account-details-container-${active}`}
    >
      <div className={`account-details account-details-${active}`}>
        <div className="exit-account-details-container">
          <button className="exit-account-details" onClick={onAccountInfo}>
            X
          </button>
        </div>

        <div className="account-name-icon">
          <div className="account-icon-container">
            <img
              className="account-image"
              src="https://lh3.googleusercontent.com/a/ACg8ocL4AmTlzrCfX6BJBtf01J7sacLBQbioaT2Fd7NJz4Dw=s288-c-no"
              alt="account profile"
            />
            <h2 className="account-name">Account Name</h2>
          </div>
        </div>

        <div className="account-text">
          <h3 className="accountname-label">accountName@accountmail.com</h3>
        </div>
      </div>
    </div>
  );
};

AccountInfo.propTypes = {
  onAccountInfo: PropTypes.func,
  accountInfoIsOpen: PropTypes.bool,
};

export default AccountInfo;
