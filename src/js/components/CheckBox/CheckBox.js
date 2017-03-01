import React from 'react';

const CheckBox = (props) => (

  <div className={`checkbox-wr ${props.labelPosition}`} >
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      defaultChecked={props.defaultChecked}
      value={props.labelInside}
      onChange={typeof props.onChange === 'function' ? props.onChange : false}
    />
    <label htmlFor={props.id}>{props.labelInside}</label>
  </div>
);

CheckBox.propTypes = {
  type: React.PropTypes.string,
  onChange: React.PropTypes.func,
  label: React.PropTypes.string,
  answerId: React.PropTypes.number,
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  labelInside: React.PropTypes.string,
  labelPosition: React.PropTypes.string,
  options: React.PropTypes.array,
  value: React.PropTypes.string,
  defaultChecked: React.PropTypes.bool,


};

CheckBox.defaultProps = {
  type: 'radio',
  defaultChecked: false,
};

export default CheckBox;
