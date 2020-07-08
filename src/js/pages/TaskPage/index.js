import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { deleteTask } from '../../actions';
import Task from '../../components/Task/Task';

import './styles.scss';

class TaskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.deleteTask = this.deleteTask.bind(this);
  }

  static propTypes = {
    currentTask: React.PropTypes.object,
    push: React.PropTypes.func,
    deleteTask: React.PropTypes.func,
    children: React.PropTypes.any,
  };

  deleteTask(currentTask) {
    this.props.push('/');
    this.props.deleteTask(currentTask.eventId);
  }

  render() {
    const { currentTask } = this.props;

    if (currentTask) {
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
                  <Task
                    currentTask={currentTask}
                    onDelete={() => this.deleteTask(currentTask)}
                  />
                )
              }
            </div>
            {this.props.children}
          </div>
        </div>
      );
    }

    return null;
  }
}

export default connect(
  (state, ownProps) => {
    return {
      currentTask: state.data.find(task => {
        return task.eventId === ownProps.params.taskId;
      }),
    };
  },
  { deleteTask, push }
)(TaskPage);
