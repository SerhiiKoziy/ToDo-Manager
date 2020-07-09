import React  from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import CreateTask from '../../components/Task/CreateTask';
import Task from "../../components/Task/Task";

import { deleteTask } from "../../actions";

const EditTask = ({ currentTask }) => {
  const deleteTask = (currentTask) => {
    this.props.push('/');
    this.props.deleteTask(currentTask.eventId);
  };

  return (
    <div className="edit-page ">
      {
        currentTask && (
          <Task
            currentTask={currentTask}
            onDelete={deleteTask(currentTask)}
          />
        )
      }
      <div className="builder-task">
        <CreateTask
          key={currentTask.updatedAt}
          currentTask={currentTask || {}}
          isEdit={true}
          buttonText="Edit event"
        />
      </div>
    </div>
  )
};

export default connect((state, ownProps) => ({
  currentTask: state.data.find(task => task.eventId === ownProps.params.taskId)
}), { deleteTask, push })(EditTask);
