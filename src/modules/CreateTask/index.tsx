import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CreateTaskForm from './CreateTaskForm';

import { createEvent, updateEvent } from "../../store/events/actionCreators";
import { getCurrentEvent } from "../../store/events/selectors";

import styles from './styles.module.scss';

const CreateTask = () => {
  const dispatch = useDispatch();
  const currentEvent = useSelector(getCurrentEvent);

  // const getLocationByAddress = (address) => {
  //   return new Promise((resolve, reject) => {
  //     geocodeByAddress(address, (err, location) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(location);
  //     });
  //   });
  // };

  const publish = useCallback(
    (): void => {
      if (currentEvent) {
        dispatch(updateEvent());
      } else {
        dispatch(createEvent());
      }
    },
    [dispatch, currentEvent],
  );

  return (
    <div className={styles.formWrapper}>
      <CreateTaskForm />
      <button
        className="btn btn--fw"
        onClick={publish}
        // disabled={!this.isValidForm() || !userUID}
      >
        {currentEvent ? 'Edit event' : 'Add event'}
      </button>
    </div>
  );
};

export default CreateTask
