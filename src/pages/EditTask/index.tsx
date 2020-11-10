import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { useParams } from 'react-router-dom';

import { Event } from '@modules/Event';

import IState from '@typing/IState';
import { setCurrentEvent, deleteEvent } from '../../store/events/actionCreators';

import IEvent from '@typing/IEvent';

interface IEditTaskProps {
  events: IEvent[];
}

const EditTask = ({ events }: IEditTaskProps) => {
  const [ currentTask, setCurrentTask ] = useState<IEvent>();
  const { taskId } = useParams();

  useEffect(
    () => {
      const event: IEvent | undefined = events.find((event: IEvent) => event.eventId === taskId);
      event && setCurrentTask(event)
      event && setCurrentEvent(event)
    },
    [events]
  );

  return (
    <div className='edit-page '>
      {
        currentTask && (
          <Event
            event={currentTask}
            onDelete={() => deleteEvent(taskId)}
            onEditEvent={(eventId) => console.log('event', eventId)}
          />
        )
      }
      <div className='builder-task'>
        {/*<CreateTask*/}
        {/*  // key={currentTask.updatedAt}*/}
        {/*  currentTask={currentTask || {}}*/}
        {/*  isEdit={true}*/}
        {/*  buttonText='Edit event'*/}
        {/*/>*/}
      </div>
    </div>
  )
};

export default connect((state: IState) => ({
  events: state.events.list,
}), { push })(EditTask);
