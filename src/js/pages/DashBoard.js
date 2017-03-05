import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateTask from '../components/Task/CreateTask';
import { Link } from 'react-router';



const mapStateToProps = (state) => {
  return { data: state.elements, columns: state.columns };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  static propTypes = {
  };

  deleteTask(taskId){
    this.props.deleteTaskInData(taskId);
  }
  componentDidUpdate(){
    //this.pullFromLocalStorage()
  }

  renderTask(item, i){
    let cloudImage = Math.ceil(item.weather.clouds / 15);
    return(
      <div className={`task ${item.type}`}
           id={item.id}
           key={i}>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        <p className="date-task">{`${item.date}`}</p>
        <p className="namePlace-task">{`${item.namePlace}`}</p>
        <div className="weather-indicator">
          <img src={`./assets/images/${cloudImage}.png`} alt=""/>
          {/*<p>clouds : {`${item.weather.clouds} %`}</p>*/}
        </div>
        <div className="controls">
          <Link to={`/task/${item.id}`}>View info</Link>
          <Link to={`/task/${item.id}/edit`}>Edit task</Link>
          <div className="deleteButton"
               onClick={this.deleteTask.bind(this, item.id)}>Delete task</div>
        </div>
      </div>
    )

  }

  render() {
    let tasksList = this.props.data;

    if(localStorage.getItem("LocalStorageTaskList")){
      let string = localStorage.getItem("LocalStorageTaskList");
      tasksList = JSON.parse(string);
      console.log("local", tasksList);
    }
    return (
      <div className={`page start-page columns`}>
        <h3>New list</h3>
        <div className="inside-wr">
          <div className="lists-wr">
            <div className="list first-list">
              {
                tasksList.map((item, i)=>{
                  return this.renderTask(item, i)
                })
              }
            </div>
            <div className="list second-list">

            </div>
            <div className="list third-list">

            </div>
          </div>

          <div className="builder-task">
            <CreateTask></CreateTask>
          </div>
        </div>
      </div>

    );
  }
}
