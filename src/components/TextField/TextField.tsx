import React from 'react';

import TextField from '@material-ui/core/TextField';

import buildClassName from '^utils/buildClassName';

import useStyles from './styles';

const Field = ({ className, label, input, placeholder, meta: { touched, invalid, error }, ...custom }) => {
  const classes = useStyles();

  const fieldClasses = buildClassName([classes.input], {
    [className]: className,
  });

  return (
    <TextField
      className={fieldClasses}
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
