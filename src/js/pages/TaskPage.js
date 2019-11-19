import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { deleteTask } from '../actions';
import SimpleMap from '../components/Task/GoogleMap';
import Task from '../components/Task/Task';

import './taskPage.scss';

class TaskPage extends Component {
  static propTypes = {
    currentTask: React.PropTypes.object,
    push: React.PropTypes.func,
    deleteTask: React.PropTypes.func,
    children: React.PropTypes.any,
  };

  deleteTask() {
    this.props.push('/');
    this.props.deleteTask(this.props.currentTask.id);
  }

  renderMap() {
    return (
      <SimpleMap
        key={JSON.stringify(this.props.currentTask.position)}
        position={this.props.currentTask.position}
      />
    );
  }

  render() {
    if (this.props.currentTask) {
      return (
        <div className="page task-page">
          <div className="inside-wr">
            <div className="task-wr">
              <div className="task-header">
                <Link to="/">
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                  <span>Back to board</span>
                </Link>
              </div>
              <Task
                item={this.props.currentTask}
                onDelete={::this.deleteTask}
                map={this.renderMap()}
                weather={this.props.currentTask.weather}
              />
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
        return task.id === ownProps.params.taskId;
      }),
    };
  },
  { deleteTask, push }
)(TaskPage);
