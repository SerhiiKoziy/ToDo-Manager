import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import TextField from '../TextField/TextField';

const FormBox = (props) => {
  let component;
  switch (props.type) {
    case 'text':
      component = (
        <TextField
          fieldType="text"
          data={props.data}
          name={props.name}
          label={props.label}
          labelAlign={props.labelAlign}
          classNameBox={props.labelPosition}
          placeholder={props.placeholder}
          value={props.value}
          id={props.id}
          activatorName={props.activatorName}
          activatorValue={props.activatorValue}
          onChange={props.onChange}
        />
      );
      break;
    case 'radio':
      component = (
        <div className={`checkbox-wrapper ${props.labelPosition}`}>
          <p>{props.label}</p>
          <div className="checkbox">
            {props.options.map((item, i) => {
              return (
                <CheckBox
                  id={`radio-${props.id + i}`}
                  type="radio"
                  name={props.name}
                  labelInside={item}
                  onChange={props.onChange}
                  key={`radio-${props.id + i}`}
                />
              );
            })}
          </div>


        </div>
      );
      break;
    default:
      throw new Error('unresolved type');
  }
  return (
    React.cloneElement(component)
  );
};

FormBox.propTypes = {
  type: React.PropTypes.string,
  data: React.PropTypes.array,
  name: React.PropTypes.string,
  labelAlign: React.PropTypes.string,
  labelPosition: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  activatorValue: React.PropTypes.string,
  activatorName: React.PropTypes.string,
  options: React.PropTypes.array,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  label: React.PropTypes.string,
  id: React.PropTypes.number,
};
FormBox.defaultProps = {};

export default FormBox;
