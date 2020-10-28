import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import CreateTaskForm from './CreateTaskForm';

import { getCurrentEvent, getEventsIsLoading } from "../../store/events/selectors";
import { getIsUserLogin } from "../../store/user/selectors";

import { createEvent, updateEvent } from "../../store/events/actionCreators";
import { validateEventForm } from "../../store/form/actionCreators";

import styles from './styles.module.scss';

const CreateTask = () => {
  const dispatch = useDispatch();
  const currentEvent = useSelector(getCurrentEvent);
  const isUserLogin = useSelector(getIsUserLogin);
  const isLoadingEvents = useSelector(getEventsIsLoading);

  const publish = useCallback(
    (): void => {
      if (currentEvent) {
        dispatch(updateEvent());
      } else {
        dispatch(createEvent());
      }
    },
    [dispatch, currentEvent, updateEvent, createEvent],
  );

  const onSave = useCallback(
    (): void => {
      dispatch(validateEventForm());
    },
    [dispatch, validateEventForm],
  );

  return (
    <div className={styles.formWrapper}>
      {
        isLoadingEvents && (
          <span className={styles.loader}>Loading...</span>
        )
      }

      <CreateTaskForm onSubmit={publish}/>

      <div className={styles.eventButtonWrapper}>
        <Button
          className={styles.eventButton}
          onClick={onSave}
          disabled={!isUserLogin}
          variant="outlined"
          type="button"
        >
          {currentEvent ? 'Edit event' : 'Add event'}
        </Button>
      </div>
    </div>
  );
};

export default CreateTask
