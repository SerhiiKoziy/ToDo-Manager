import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { push } from 'react-router-redux';
import { useParams } from "react-router-dom";

import Task from '../../components/Task/Task';

import { deleteTask } from '../../store/actions/tasksActions';

import './styles.module.scss';
import {StoreState} from "../../store/reducers";

interface ITaskPageProps {
  data: any;
  deleteTask: (eventId: string) => void;
  children: any;
}

const TaskPage = ({ data, deleteTask, children }: ITaskPageProps) => {
  const [ currentTask, setCurrentTask ] = useState({});
  const { taskId } = useParams();
  useEffect(
    () => {
      const task = data.find((task: any) => task.eventId === taskId);
      setCurrentTask(task)
    },
    [data]
  );

  const handleDeleteTask = (currentTask: any) => {
    // this.props.push('/');
    deleteTask(currentTask.eventId);
  };

  return (
    <>
      {
        currentTask && (
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
                    <Task
                      currentTask={currentTask}
                      onDelete={() => handleDeleteTask(currentTask)}
                    />
                  )
                }
              </div>
              {children}
            </div>
          </div>
        )
      }
    </>
  )
};

export default connect(
  (state: StoreState) => ({
    data: state.data,
  }),
  { deleteTask, push }
)(TaskPage);
