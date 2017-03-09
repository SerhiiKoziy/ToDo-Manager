import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { deleteTask } from '../actions';
import SimpleMap from '../components/Task/GoogleMap';
import Task from '../components/Task/Task';

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

  renderWeather() {
    const weather = this.props.currentTask.weather;
    return Object.keys(weather).map(key => {
      if (key !== 'weather' && key !== 'temp') {
        return (
          <div key={key}>
            <span>{key} :</span>
            <span>{weather[key]}</span>
          </div>
        );
      }

      return null;
    });
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
        <div className={'page task-page'}>
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
              >
                {this.renderWeather()}
              </Task>

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
        return task.id === parseFloat(ownProps.params.taskId);
      }),
    };
  },
  { deleteTask, push }
)(TaskPage);
