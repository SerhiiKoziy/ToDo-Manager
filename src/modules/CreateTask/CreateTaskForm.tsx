import React, { useCallback } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';

import DatePicker from '@components/DatePicker';
import TextField from '@components/TextField';

import { getIsUserLogin } from '@store/user/selectors';
import { getCurrentEvent } from '@store/events/selectors';

import { EVENT_FORM } from '@configs/forms';

import { required } from '../../utils/validations';

const CreateTaskForm = () => {
  const isUserLogin = useSelector(getIsUserLogin);
  const currentEvent = useSelector(getCurrentEvent);
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);

  const disabledDates = useCallback(
    (date: string) => {
      const currentDate = Date.parse(`${new Date()}`);
      const maxDateFromCurrent = currentDate + (14 * 1000 * 3600 * 24); // 14 days //TODO make logic without seconds

      return Date.parse(date) > maxDateFromCurrent;
    },
    [],
  );

  return (
    <div>
      <Field
        name='date'
        type='text'
        className={'input-wr'}
        component={DatePicker}
        placeholder={"Choose event's date"}
        label={"Choose event's date"}
        validate={required}
        fullWidth
        disablePast
        // disabled={!editable}
        defaultValue={currentEvent?.date}
        disabledDates={disabledDates}
      />

      <Field
        name='title'
        type='text'
        className={'input-wr'}
        component={TextField}
        placeholder={'Enter event title'}
        label={'Enter event title'}
        validate={required}
        fullWidth
        // disabled={!editable}
        defaultValue={currentEvent?.title}
      />

      <Field
        name='description'
        type='text'
        className={'input-wr'}
        component={TextField}
        placeholder={'Enter description'}
        label={'Add description'}
        fullWidth
        defaultValue={currentEvent?.description}
      />
      {/*<Field*/}
      {/*  name='address'*/}
      {/*  type='text'*/}
      {/*  className={'input-wr'}*/}
      {/*  component={PlacesAutocomplete}*/}
      {/*  placeholder={'Enter deadline location address'}*/}
      {/*  // label={texts.name}*/}
      {/*  // validate={[required]}*/}
      {/*  fullWidth*/}
      {/*  // disabled={!editable}*/}
      {/*/>*/}

      {
        !isUserLogin && (
          <p className='submit-message'>Login, please!</p>
        )
      }
    </div>
  )
};

export default reduxForm({
  form: EVENT_FORM,
  enableReinitialize: true,
})(CreateTaskForm);
