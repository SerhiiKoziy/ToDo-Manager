import React from 'react';


const Button = ({ type, onClick, children }) => (
  <button
    className={`btn btn--${type}`}
    onClick={typeof onClick === 'function' ? onClick : false}
  >
    <span>{`${children}`}</span>
  </button>
);

Button.propTypes = {
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
  children: React.PropTypes.string,
};

Button.defaultProps = {
  type: 'default',
};

export default Button;
