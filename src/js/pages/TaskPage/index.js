import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { deleteTask } from '../../actions';
import Task from '../../components/Task/Task';

import './styles.scss';

const TaskPage = ({ currentTask }) => {
  const deleteTask = (currentTask) => {
    this.props.push('/');
    this.props.deleteTask(currentTask.eventId);
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
                      onDelete={() => deleteTask(currentTask)}
                    />
                  )
                }
              </div>
              {this.props.children}
            </div>
          </div>
        )
      }
    </>
  )
};

export default connect(
  (state, ownProps) => {
    return {
      currentTask: state.data.find(task => task.eventId === ownProps.params.taskId),
    };
  },
  { deleteTask, push }
)(TaskPage);
