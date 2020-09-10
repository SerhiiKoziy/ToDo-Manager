import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import CreateTask from '../../modules/Task/CreateTask';
import Index from '../../modules/Task';
import Dustbin from '../../components/dnd/Dustbin';
import Box from '../../components/dnd/Box';

import ItemTypes from '../../components/dnd/ItemTypes';
import IEvent from '../../types/IEvent';

import { getEventsList } from '../../store/events/selectors';
import { getEventsIsLoading } from '../../store/events/selectors';
import { deleteTask, editTaskAction } from '../../store/actions/tasksActions';

import styles from './styles.module.scss';

interface IDustbins {
  accepts: string[];
  lastDroppedItem: null;
  id: string;
}

const dustbins = [
  {
    accepts: [ItemTypes.INPROGRES, ItemTypes.DONE],
    lastDroppedItem: null,
    id: ItemTypes.TODO,
  },
  {
    accepts: [ItemTypes.TODO, ItemTypes.DONE],
    lastDroppedItem: null,
    id: ItemTypes.INPROGRES,
  },
  {
    accepts: [ItemTypes.TODO, ItemTypes.INPROGRES, NativeTypes.URL],
    lastDroppedItem: null,
    id: ItemTypes.DONE,
  },
];

const Dashboard = () => {
  const events = useSelector(getEventsList);
  const eventsIsLoading = useSelector(getEventsIsLoading);
  const dispatch = useDispatch();

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([]);
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     dustbins: [
  //       {
  //         accepts: [ItemTypes.INPROGRES, ItemTypes.DONE],
  //         lastDroppedItem: null,
  //         id: ItemTypes.TODO,
  //       },
  //       {
  //         accepts: [ItemTypes.TODO, ItemTypes.DONE],
  //         lastDroppedItem: null,
  //         id: ItemTypes.INPROGRES,
  //       },
  //       {
  //         accepts: [ItemTypes.TODO, ItemTypes.INPROGRES, NativeTypes.URL],
  //         lastDroppedItem: null,
  //         id: ItemTypes.DONE,
  //       },
  //     ],
  //     droppedBoxNames: [],
  //   };
  //
  //   // this.handleDrop = this.handleDrop.bind(this);
  // }

  const handleDeleteTask = useCallback(
    (taskId: string): void => {
      dispatch(deleteTask(taskId));
    },
    [dispatch],
  );

  const handleDrop = useCallback(
    (index: number, event: IEvent, target: any): void => {
      const changedTask = events.filter((eventItem: IEvent) => {
        return eventItem.eventId == event.taskId;
      })[0];
      // console.log('changedTask', changedTask)
      changedTask.stageProces = target; //TODO check

      dispatch(editTaskAction(changedTask));
    },
    [dispatch, events],
  );

  const isDropped = (boxName: string) =>  {
    return droppedBoxNames.indexOf(boxName) > -1;
  };

  const renderTask = (event: IEvent, i: number) => {
    const { title, eventId } = event;

    return (
      <Box
        name={title}
        type={event.stageProces}
        taskId={eventId}
        isDropped={isDropped(title)}
        key={i}
      >
        <Index
          key={i}
          event={event}
          onDelete={() => deleteTask(eventId)}
        />
      </Box>
    );
  };

  // const handleDrop = (index: number, event: IEvent, target: any) => {
  //   const changedTask = events?.filter((element: IEvent) => {
  //     return element.eventId == event.taskId; //TODO check
  //   })[0];
  //
  //   // changedTask && changedTask?.stageProces = target; //TODO check
  //   editTaskAction(changedTask);
  // };

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
                          return renderTask(event, i);
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
