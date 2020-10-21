﻿import React, { useEffect, useState, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { push } from 'react-router-redux';
import { useParams } from "react-router-dom";

import { Event } from '../../modules/Event';

import IState from "../../types/IState";
import IEvent from "../../types/IEvent";

import './styles.module.scss';

interface ITaskPageProps {
  events: IEvent[];
  deleteTask: (eventId: string) => void;
  children: ReactNode;
}

const TaskPage = ({ events, deleteTask, children }: ITaskPageProps) => {
  const [ currentTask, setCurrentTask ] = useState<IEvent>();
  const { taskId } = useParams();
  useEffect(
    () => {
      const task = events.find((event: IEvent) => event.eventId === taskId);
      task && setCurrentTask(task)
    },
    [events]
  );

  const handleDeleteTask = (currentTask: IEvent) => {
    // this.props.push('/');
    deleteTask(currentTask.eventId);
  };

  return (
    <div className="page task-page">
      <div className="inside-wr">
        <div className="task-wr">
          <div className="task-header">
            <Link to="/">
              <i className="fa fa-angle-left" aria-hidden="true" />
              <span>Back to board</span>
            </Link>
          </div>
          {
            currentTask && (
              <Event
                event={currentTask}
                onDelete={() => handleDeleteTask(currentTask)}
                onEditEvent={(eventId) => console.log('event', eventId)}
              />
            )
          }
        </div>
        {children}
      </div>
    </div>
  )
};

export default connect(
  (state: IState) => ({
    events: state.events.list, //TODO add hooks
  }),
  { push }
)(TaskPage);
