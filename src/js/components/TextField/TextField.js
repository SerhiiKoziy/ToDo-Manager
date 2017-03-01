import React, { PropTypes } from 'react';


const TextField = (props) => {
  const isElementActive = props.data.map(item => {
    if (item.name === props.activatorName) {
      return item.value;
    }
  }).filter(item => !!item)[0];

  const renderElement = <div className={`input-box ${props.classNameBox}`}>
    <label className="label" htmlFor={props.id}>{props.label}</label>
    <input
      name={props.name}
      label={props.label}
      placeholder={props.placeholder}
      defaultValue={props.value}
      id={props.id}
      onChange={typeof props.onChange === 'function' ? props.onChange : false}
    />
  </div>;

  return !!props.activatorName ? (

    (isElementActive === props.activatorValue) ?
      (
        <div>
          {renderElement}
        </div>
      )
      : (null)
  ) : (
    <div>
      {renderElement}
    </div>
  );


};

// Make ESLint happy again: add validation to props
TextField.propTypes = {
  placeholder: PropTypes.string,
  errorVisible: PropTypes.bool,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  data: React.PropTypes.array.isRequired,
  type: React.PropTypes.string,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  classNameBox: React.PropTypes.string,
  labelPosition: React.PropTypes.string,
  value: React.PropTypes.string,
  id: React.PropTypes.number,
  activatorName: React.PropTypes.string,
  activatorValue: React.PropTypes.string,

};
TextField.defaultProps = {
  errorText: 'error',
  fieldType: 'input',
  placeholder: '',
  errorVisible: false,
  onChange: () => {
  },

};

export default TextField;
