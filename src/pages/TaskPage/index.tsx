import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { push } from 'react-router-redux';
import { useParams } from "react-router-dom";

import Index from '../../modules/Task';

import { deleteTask } from '../../store/actions/tasksActions';

import IState from "../../types/IState";
import IEvent from "../../types/IEvent";

import './styles.module.scss';

interface ITaskPageProps {
  events: IEvent[];
  deleteTask: (eventId: string) => void;
  children: any;
}

const TaskPage = ({ events, deleteTask, children }: ITaskPageProps) => {
  const [ currentTask, setCurrentTask ] = useState<IEvent>();
  const { taskId } = useParams();
  useEffect(
    () => {
      const task = events.find((task: any) => task.eventId === taskId);
      task && setCurrentTask(task)
    },
    [events]
  );

  const handleDeleteTask = (currentTask: any) => {
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
              <Index
                event={currentTask}
                onDelete={() => handleDeleteTask(currentTask)}
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
    events: state.events.events, //TODO add hooks
  }),
  { deleteTask, push }
)(TaskPage);
