﻿import React, { Component } from 'react';
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
export default class TaskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  static propTypes = {
  };

  renderTask(item, i){
    let cloudImage = Math.ceil(item.weather.clouds / 15);
    return(
      <div id={i}
           key={i}
           className={`task ${item.type}`}>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        <p className="date-task">{`${item.date}`}</p>
        <p className="namePlace-task">{`${item.namePlace}`}</p>
        <div className="weather-indicator">
          <img src={`./assets/images/${cloudImage}.png`} alt=""/>
        </div>
        <div className="controls">

        </div>
      </div>
    )

  }

  render() {
    let tasksList = this.props.data;
    if(localStorage.getItem("LocalStorageTaskList")){
      let string = localStorage.getItem("LocalStorageTaskList");
      tasksList = JSON.parse(string)
      console.log("local", tasksList);
    }
    const currentTask = this.props.params.taskId;


    return (
      <div className={`page task-page`}>
        <h3>Task</h3>
        {/*{this.props.children}*/}
        <div className="inside-wr">
              {
                tasksList.map((item, i)=>{
                  if(item.id == currentTask){
                    return this.renderTask(item, i)
                  }

                })
              }
        </div>
      </div>

    );
  }
}
