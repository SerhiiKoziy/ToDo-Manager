import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateTask from '../components/Task/CreateTask';


const mapStateToProps = (state) => {
  return { data: state.data };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class EditTask extends Component {

  render() {
    const tasksList = this.props.data;
    const currentTaskID = this.props.params.taskId;
    const currentTask = tasksList.find(item => item.id == currentTaskID);

    return (
      <div className="builder-task edit-builder-task">
        <CreateTask
          key={currentTask.updatedAt}
          currentTask={currentTask || {}}
          buttonText={"Edit task"}
        />
      </div>
    );
  }
}
