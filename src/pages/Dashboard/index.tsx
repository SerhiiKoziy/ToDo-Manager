import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import CreateTask from '../../modules/CreateTask';
import { Event } from '../../modules/Event';
import Dustbin from '../../components/dnd/Dustbin';
import Box from '../../components/dnd/Box';

import ItemTypes from '../../components/dnd/ItemTypes';
import IEvent from '../../types/IEvent';

import { getEventsList } from '../../store/events/selectors';
import { getEventsIsLoading } from '../../store/events/selectors';
import { setCurrentEvent, updateEvent, deleteEvent } from '../../store/events/actionCreators';

import styles from './styles.module.scss';

interface IDustbins {
  accepts: string[];
  lastDroppedItem: null;
  id: string;
}

const dustbins = [
  {
    accepts: [ItemTypes.INPROGRESS, ItemTypes.DONE],
    lastDroppedItem: null,
    id: ItemTypes.TODO,
  },
  {
    accepts: [ItemTypes.TODO, ItemTypes.DONE],
    lastDroppedItem: null,
    id: ItemTypes.INPROGRESS,
  },
  {
    accepts: [ItemTypes.TODO, ItemTypes.INPROGRESS, NativeTypes.URL],
    lastDroppedItem: null,
    id: ItemTypes.DONE,
  },
];

const Dashboard = () => {
  const events = useSelector(getEventsList);
  const eventsIsLoading = useSelector(getEventsIsLoading);
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
    (index: number, event: IEvent, target: any): void => {
      const changedTask = events.find((eventItem: IEvent) => {
        return eventItem.eventId == event.taskId;
      });

      if (changedTask) {
        changedTask.stageProces = target;

        dispatch(updateEvent(changedTask));
      }
    },
    [dispatch, events],
  );

  const isDropped = (boxName: string) =>  {
    return droppedBoxNames.indexOf(boxName) > -1;
  };

  const renderEvent = (event: IEvent, i: number) => {
    const { title, eventId } = event;

    return (
      <Box
        name={title}
        type={event.stageProces}
        taskId={eventId}
        isDropped={isDropped(title)}
        key={i}
      >
        <Event
          key={i}
          event={event}
          onDelete={() => onDeleteEvent(eventId)}
          onEditEvent={() => onEditEvent(eventId)}
        />
      </Box>
    );
  };

  if (eventsIsLoading) {
    return <span>Loading...</span>
  }

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
                      events?.map((event: IEvent, i: number) => {
                        if (event.stageProces === id) {
                          return renderEvent(event, i);
                        }

                        return null;
                      })
                    }
                  </Dustbin>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className={styles.builderTask}>
        <CreateTask />
      </div>
    </div>
  );
};

export default DragDropContext(HTML5Backend)(Dashboard);
