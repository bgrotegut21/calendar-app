import '../styles/Modal.css';

import PropTypes from 'prop-types';

const Modal = ({ message, onYes, onNo, modalIsOpen }) => {
  const active = modalIsOpen ? 'active' : '';

  return (
    <div className={`modal-container modal-container-${active}`}>
      <div className={`modal modal-${active}`}>
        <div className="modal-message-container">
          <h3 className="modal-message">{message}</h3>
        </div>
        <div className="modal-buttons">
          <button className="modal-button modal-button-yes" onClick={onYes}>
            Yes
          </button>
          <button className="modal-button modal-button-no" onClick={onNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string,
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  modalIsOpen: PropTypes.bool,
};
export default Modal;
