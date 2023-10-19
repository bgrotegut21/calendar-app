const AccountInfo = (onAccountInfo, accountInfoIsOpen) => {
  const active = accountInfoIsOpen ? 'active' : '';

  return (
    <div className="account-details-container">
      <div className="account-details">
        <button className="exit-account-details" onClick={onAccountInfo}>
          X
        </button>

        <div className="account-name-icon">
          <div className="account-icon-container">
            <img
              className="account-image"
              src="https://lh3.googleusercontent.com/a/ACg8ocL4AmTlzrCfX6BJBtf01J7sacLBQbioaT2Fd7NJz4Dw=s288-c-no"
              alt="account profile"
            />
            <h2>Account Name</h2>
          </div>
        </div>

        <div className="account-text">
          <h3>accountname@gmail.com</h3>
        </div>
      </div>
    </div>
  );
};
