import React, { PropTypes } from 'react';

const TextField = ({ onBlur, onChange, classNameBox, label, id, name, placeholder, maxLength, value, fieldName, errorText }) => (
  <div className={`input-box ${classNameBox}`}>
    <label
      className="label"
      htmlFor={id}
    >
      {label}
    </label>
    <input
      name={name}
      label={label}
      placeholder={placeholder}
      id={id}
      maxLength={maxLength}
      onBlur={onBlur.bind(null, fieldName)}
      onChange={onChange.bind(null, fieldName)}
      value={value || ''}
    />
    <label className="error visible">{errorText}</label>
  </div>
);

TextField.propTypes = {
  placeholder: PropTypes.string,
  errorVisible: PropTypes.bool,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  type: React.PropTypes.string,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  fieldName: React.PropTypes.string,
  classNameBox: React.PropTypes.string,
  value: React.PropTypes.string,
  id: React.PropTypes.number,
  maxLength: React.PropTypes.any,

};

TextField.defaultProps = {
  errorText: 'error',
  fieldType: 'input',
  placeholder: '',
  errorVisible: false,
};

export default TextField;
