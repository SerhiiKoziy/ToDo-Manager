import React from "react";
import { Field, reduxForm } from 'redux-form';
import { useSelector } from "react-redux";

import DatePicker from "../../components/DatePicker";
import TextField from "../../components/TextField";

import { getIsUserLogin } from "../../store/user/selectors";
import { getCurrentEvent } from "../../store/events/selectors";

import { EVENT_FORM } from '../../configs/forms';

import styles from "./styles.module.scss";

const CreateTaskForm = () => {
  const isUserLogin = useSelector(getIsUserLogin);
  const currentEvent = useSelector(getCurrentEvent);
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);

  return (
    <div className={styles.formWrapper}>
      <Field
        name="date"
        type="text"
        className={'input-wr'}
        component={DatePicker}
        placeholder={"Choose event's date"}
        label={"Choose event's date"}
        // validate={[required]}
        fullWidth
        // disabled={!editable}
        defaultValue={currentEvent?.date}
      />

      <Field
        name="title"
        type="text"
        className={'input-wr'}
        component={TextField}
        placeholder={'Enter title'}
        label={'Enter event name'}
        // validate={[required]}
        fullWidth
        // disabled={!editable}
        defaultValue={currentEvent?.title}
      />

      <Field
        name="description"
        type="text"
        className={'input-wr'}
        component={TextField}
        placeholder={'Enter description'}
        label={'Add description'}
        // validate={[required]}
        fullWidth
        // disabled={!editable}
        defaultValue={currentEvent?.description}
      />
      {/*<Field*/}
      {/*  name="address"*/}
      {/*  type="text"*/}
      {/*  className={'input-wr'}*/}
      {/*  component={PlacesAutocomplete}*/}
      {/*  placeholder={'Enter deadline location address'}*/}
      {/*  // label={texts.name}*/}
      {/*  // validate={[required]}*/}
      {/*  fullWidth*/}
      {/*  // disabled={!editable}*/}
      {/*/>*/}
      {/*<div className="input-box input-wr">*/}
      {/*  <PlacesAutocomplete*/}
      {/*    value={this.state.values.address || ''}*/}
      {/*    onChange={this.changeLocation}*/}
      {/*    onBlur={this.handleInputBlur}*/}
      {/*    placeholder="Enter deadline location address"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<TextField*/}

      {/*<button*/}
      {/*  // type="submit"*/}
      {/*  className="btn btn--fw"*/}
      {/*  onClick={handlerSubmit}*/}
      {/*  // disabled={!this.isValidForm() || !userUID}*/}
      {/*>*/}
      {/*  {buttonText || 'Add event'}*/}
      {/*</button>*/}
      {
        !isUserLogin && (
          <p className="submit-message">Login, please!</p>
        )
      }
    </div>
  )
};

export default reduxForm({
  form: EVENT_FORM,
  enableReinitialize: true,
})(CreateTaskForm);
