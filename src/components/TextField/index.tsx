import React from 'react';

import TextField from '@material-ui/core/TextField';

// import buildClassName from '../../utils/buildClassName';

const Field = ({ className, label, input, placeholder, meta: { touched, invalid, error }, ...custom }: any) => {
  // const fieldClasses = buildClassName({
  //   [className]: className,
  // });

  return (
    <TextField
      className={className}
      label={label}
      placeholder={placeholder || label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );
};

export default Field;
