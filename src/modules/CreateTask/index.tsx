import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import CreateTaskForm from './CreateTaskForm';

import { createEvent, updateEvent } from "../../store/events/actionCreators";
import { getCurrentEvent } from "../../store/events/selectors";
import { getIsUserLogin } from "../../store/user/selectors";

import styles from './styles.module.scss';

const CreateTask = () => {
  const dispatch = useDispatch();
  const currentEvent = useSelector(getCurrentEvent);
  const isUserLogin = useSelector(getIsUserLogin);

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
      <div className={styles.eventButtonWrapper}>
        <Button
          className={styles.eventButton}
          onClick={publish}
          disabled={!isUserLogin}
          variant="outlined"
        >
          {currentEvent ? 'Edit event' : 'Add event'}
        </Button>
      </div>

    </div>
  );
};

export default CreateTask
