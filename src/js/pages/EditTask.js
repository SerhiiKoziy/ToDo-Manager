import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateTask from '../components/Task/CreateTask';



const mapStateToProps = (state) => {
  return { data: state.elements, columns: state.columns };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  renderEditForm(){
    let tasksList = this.props.data;
    const currentTaskID = this.props.params.taskId;
    const currentTask = tasksList.find(item => item.id == currentTaskID)

    return(
      <div className="builder-task edit-builder-task">
        <CreateTask
          currentTask = { currentTask || {} }
          buttonText = {"Edit task"}
          startDate ={ currentTask.originalDate}
        />
      </div>
    )
  }


  render() {
    return this.renderEditForm();
  }
}
