import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateTask from '../components/Task/CreateTask';
import { Link } from 'react-router';

import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import Dustbin from '../components/dnd/Dustbin';
import Box from '../components/dnd/Box';
import ItemTypes from '../components/dnd/ItemTypes';

const mapStateToProps = (state) => {
  return { data: state.elements, columns: state.columns };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};
@DragDropContext(HTML5Backend)
@connect(mapStateToProps, mapDispatchToProps)
export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [
        { accepts: [ItemTypes.TODO], lastDroppedItem: null },
        { accepts: [ItemTypes.INPROGRES], lastDroppedItem: null },
        { accepts: [ItemTypes.DONE, ItemTypes.TODO, NativeTypes.URL], lastDroppedItem: null },
        //{ accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
      ],
      boxes: [
        { name: 'first', type: ItemTypes.TODO },
        { name: 'sec', type: ItemTypes.INPROGRES },
        { name: 'third', type: ItemTypes.DONE },
      ],
      droppedBoxNames: [],
    };

  }

  static propTypes = {
  };
  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }
  deleteTask(taskId){
    this.props.deleteTaskInData(taskId);
  }
  componentDidUpdate(){
  }

  renderTask(item, i){

    let cloudImage = Math.ceil(item.weather.clouds / 15);
    return(
    <Box
      name={item.title}
      type={ItemTypes.TODO}
      isDropped={this.isDropped(item.title)}
      key={i}
    >
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
    </Box>
    )

  }
  handleDrop(index, item) {
    const { name } = item;

    this.setState(update(this.state, {
      dustbins: {
        [index]: {
          lastDroppedItem: {
            $set: item,
          },
        },
      },
      droppedBoxNames: name ? {
        $push: [name],
      } : {},
    }));
  }


  render() {
    let tasksList = this.props.data;
    const { boxes, dustbins } = this.state;


    if(localStorage.getItem("LocalStorageTaskList")){
      let string = localStorage.getItem("LocalStorageTaskList");
      tasksList = JSON.parse(string);
      //this.sendLocalList(tasksList)
     // console.log("local", tasksList);
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
            <CreateTask/>
          </div>
        </div>

        <div className="inside-wr">
          <div className="lists-wr">
            {dustbins.map(({ accepts, lastDroppedItem }, index) =>
              <Dustbin
                accepts={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={item => this.handleDrop(index, item)}
                key={index}
              />,
            )}
          </div>

        </div>
      </div>

    );
  }
}
