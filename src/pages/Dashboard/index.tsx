import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import CreateTask from '@modules/CreateTask';
import { Event } from '@modules/Event';

import Dustbin from '@components/Dnd/Dustbin';
import DragBox from '@components/Dnd/DragBox';

import EventStatus from '@typing/EventStatus';
import IEvent from '@typing/IEvent';

import { getEventsList } from '@store/events/selectors';
import { getEventsIsLoading } from '@store/events/selectors';
import { setCurrentEvent, updateEvent, deleteEvent } from '@store/events/actionCreators';

import styles from './styles.module.scss';

const dustbins = [
  {
    accepts: [EventStatus.IN_PROGRESS, EventStatus.DONE],
    lastDroppedItem: null,
    id: EventStatus.TODO,
  },
  {
    accepts: [EventStatus.TODO, EventStatus.DONE],
    lastDroppedItem: null,
    id: EventStatus.IN_PROGRESS,
  },
  {
    accepts: [EventStatus.TODO, EventStatus.IN_PROGRESS, NativeTypes.URL],
    lastDroppedItem: null,
    id: EventStatus.DONE,
  },
];

const Dashboard = () => {
  const events = useSelector(getEventsList);
  const isLoadingEvents = useSelector(getEventsIsLoading);
  const dispatch = useDispatch();

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([]);

  const onDeleteEvent = useCallback(
    (eventId: string): void => {
      dispatch(deleteEvent(eventId));
    },
    [dispatch],
  );

  const onEditEvent = useCallback(
    (eventId: string): void => {
      const currentEvent = events.find((event: IEvent) => event.eventId === eventId);

      currentEvent && dispatch(setCurrentEvent(currentEvent));
    },
    [dispatch, events],
  );

  const handleDrop = useCallback(
    (index: number, event: IEvent, target: string): void => {
      const changedEvent = events.find((eventItem: IEvent) => (eventItem.eventId == event.eventId));

      if (changedEvent) {
        changedEvent.stageProces = target;

        dispatch(updateEvent(changedEvent));
      }
    },
    [dispatch, events],
  );

  const isDropped = (boxName: string) => droppedBoxNames.indexOf(boxName) > -1;

  const renderEvent = (event: IEvent, i: number) => {
    const { title, eventId, stageProces } = event;

    return (
      <DragBox
        name={title}
        type={stageProces}
        eventId={eventId}
        isDropped={isDropped(title)}
        key={i}
      >
        <Event
          key={i}
          event={event}
          onDelete={() => onDeleteEvent(eventId)}
          onEditEvent={() => onEditEvent(eventId)}
        />
      </DragBox>
    );
  };

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.insideWrapper}>
        <div className={styles.lists}>
          {
            dustbins.map(({ accepts, id }, index) => {
              return (
                <div
                  key={`wr-${index}`}
                  className={styles.listWrapper}
                >
                  <div className={styles.listName}>
                    <h3>
                      {id}
                    </h3>
                  </div>
                  <Dustbin
                    accepts={accepts}
                    listId={id}
                    onDrop={(event: IEvent, target: any) => handleDrop(index, event, target)}
                    key={index}
                    index={index}
                  >
                    {
                      events?.map((event: IEvent, i: number) => event.stageProces === id ? renderEvent(event, i) : null)
                    }
                  </Dustbin>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className={styles.builderEvent}>
        <CreateTask />
      </div>
    </div>
  );
};

export default DragDropContext(HTML5Backend)(Dashboard);
