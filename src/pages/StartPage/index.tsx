import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import CreateTask from '../../components/Task/CreateTask';
import Task from '../../components/Task/Task';
import Dustbin from '../../components/dnd/Dustbin';
import Box from '../../components/dnd/Box';
import ItemTypes from '../../components/dnd/ItemTypes';
import ITask from '../../types/ITask';

import { StoreState } from "../../store/reducers";
import { deleteTask, editTaskAction } from '../../store/actions/tasksActions';

import './styles.module.scss';

const state = {
  dustbins: [
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
  ],
  droppedBoxNames: [],
};

interface IStartPage {
  data: ITask[];
  droppedBoxNames: any;
  editTaskAction: (changedTask: any) => void;
  deleteTask: (taskId: string) => void;
}

const StartPage = ({ data, droppedBoxNames, editTaskAction, deleteTask }: IStartPage) => {
  console.log('data', data)
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

  const isDropped = (boxName: string) =>  {
    // return state.droppedBoxNames.indexOf(boxName) > -1;
    return false;
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const renderTask = (item: ITask, i: number, type: string) => {
    return (
      <Box
        name={item.title}
        type={type}
        taskId={item.eventId}
        isDropped={isDropped(item.title)}
        key={i}
      >
        <Task
          currentTask={item}
          key={i}
          onDelete={() => deleteTask(item.eventId)}
          parentWr={"onBoard-task"}
        />
      </Box>
    );
  };
  //
  // renderTaskMobile(item, i) {
  //   return (
  //     item && <Task
  //       currentTask={item}
  //       key={i}
  //       parentWr={"onBoard-task"}
  //       onDelete={this.deleteTask.bind(this, item.eventId)}
  //     />
  //   );
  // }
  //
  const handleDrop = (index: number, item: any, target: any) => {
    const changedTask = data.filter((element: any) => {
      return element.eventId == item.taskId;
    })[0];

    changedTask.stageProces = target;
    editTaskAction(changedTask);
  };

  const renderDustbins = () => {
    return state.dustbins.map(({ accepts, id }, index) => {
      return (
        <div key={`wr-${index}`} className="list-wrapper">
          <div className="list-name">
            <h3>
              {id}
            </h3>
          </div>
          <Dustbin
            accepts={accepts}
            listId={id}
            onDrop={(item: ITask, target: any) => {
              return handleDrop(index, item, target);
            }}
            key={index}
            index={index}
          >
            {
              data && data.map((item: ITask, i: number) => {
                if (item.stageProces === id) {
                  const type = item.stageProces;

                  return renderTask(item, i, type);
                }

                return null;
              })
            }
          </Dustbin>
        </div>
      );
    });
  };

  return (
    <div className="page start-page columns">
      <div className="dashboard-wr">
        <div className="inside-wr">
          <div className="lists-wr desktop">
            {renderDustbins}
          </div>
          <div className="lists-wr mobile">
            <div className="list">
              {/*{*/}
              {/*  data && data.map((item, i) => {*/}
              {/*    return renderTaskMobile(item, i);*/}
              {/*  })*/}
              {/*}*/}
            </div>
          </div>
        </div>
        <div className="builder-task mobile">
          <CreateTask />
        </div>
      </div>
    </div>
  );
};

const ConnectedComponent = connect((state: StoreState) => ({
  data: state.data
}), { deleteTask, editTaskAction })(StartPage);

export default DragDropContext(HTML5Backend)(ConnectedComponent);
