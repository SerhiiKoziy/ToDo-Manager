import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CreateTask from '../components/Task/CreateTask';
import Task from "../components/Task/Task";
import { deleteTask } from "../actions";

import './editTask.scss';

class EditTask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.deleteTask = this.deleteTask.bind(this);
  }

  static propTypes = {
    push: React.PropTypes.func,
    deleteTask: React.PropTypes.func,
  };

  deleteTask(currentTask) {
    this.props.push('/');
    this.props.deleteTask(currentTask.id);
  }

  render() {
    const { currentTask } = this.props;

    return (
      <div className="edit-page ">
        {
          currentTask && (
            <Task
              currentTask={currentTask}
              onDelete={() => this.deleteTask(currentTask)}
            />
          )
        }
        <div className="builder-task">
          <CreateTask
            key={currentTask.updatedAt}
            currentTask={currentTask || {}}
            buttonText="Edit event"
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    return {
      currentTask: state.data.find(task => {
        return task.id === ownProps.params.taskId;
      }),
    };
  },
  { deleteTask, push }
)(EditTask);

