import '../styles/MonthlyNav.css';

import PropTypes from 'prop-types';

import previousArrow from '../../public/images/previousArrow.svg';
import nextArrow from '../../public/images/nextArrow.svg';

const Arrow = ({ onClick, src, alt }) => {
  return (
    <button className="arrow" onClick={onClick}>
      <img className="arrow-image" src={src} alt={alt} width={40} />
    </button>
  );
};

Arrow.propTypes = {
  onClick: PropTypes.func,
  alt: PropTypes.string,
  src: PropTypes.string,
};

const MonthlyNav = ({ month, year, onLeftArrow, onRightArrow }) => {
  return (
    <div className="monthly-nav">
      <div className="monthly-nav-items">
        <Arrow onClick={onLeftArrow} src={previousArrow} alt="previous arrow" />

        <h2 className="monthlynav-dates-title">
          {month} {year}
        </h2>

        <Arrow onClick={onRightArrow} src={nextArrow} alt="next arrow" />
      </div>
    </div>
  );
};

MonthlyNav.propTypes = {
  month: PropTypes.string,
  year: PropTypes.string,
  onLeftArrow: PropTypes.func,
  onRightArrow: PropTypes.func,
};

export default MonthlyNav;
