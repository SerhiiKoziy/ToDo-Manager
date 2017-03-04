import React, { PropTypes } from 'react';


const TextField = (props) => {


  return (

    <div className={`input-box ${props.classNameBox}`}>
      <label className="label" htmlFor={props.id}>{props.label}</label>
      <input
        name={props.name}
        label={props.label}
        placeholder={props.placeholder}
        id={props.id}
        onChange={typeof props.onChange === 'function' ? props.onChange : false}
      />
    </div>
  )

};

// Make ESLint happy again: add validation to props
TextField.propTypes = {
  placeholder: PropTypes.string,
  errorVisible: PropTypes.bool,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  type: React.PropTypes.string,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  classNameBox: React.PropTypes.string,
  value: React.PropTypes.string,
  id: React.PropTypes.number,

};
TextField.defaultProps = {
  errorText: 'error',
  fieldType: 'input',
  placeholder: '',
  errorVisible: false,

};

export default TextField;
