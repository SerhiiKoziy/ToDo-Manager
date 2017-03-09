import React, { Component } from 'react';
import { deleteTaskInList, updateTask } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateTask from '../components/Task/CreateTask';
import Task from '../components/Task/Task';

import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import Dustbin from '../components/dnd/Dustbin';
import Box from '../components/dnd/Box';
import ItemTypes from '../components/dnd/ItemTypes';

const mapStateToProps = (state) => {
  return { data: state.data };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};
@DragDropContext(HTML5Backend)
@connect(mapStateToProps, {
  deleteTaskInList, updateTask
})
export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [
        { accepts: [ItemTypes.INPROGRES, ItemTypes.DONE], lastDroppedItem: null, id: ItemTypes.TODO },
        { accepts: [ItemTypes.TODO, ItemTypes.DONE], lastDroppedItem: null, id: ItemTypes.INPROGRES },
        { accepts: [ItemTypes.TODO, ItemTypes.INPROGRES, NativeTypes.URL], lastDroppedItem: null, id: ItemTypes.DONE },
      ],
      droppedBoxNames: [],
    };

  }

  static propTypes = {};

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }

  deleteTask(taskId) {
    this.props.deleteTaskInList(taskId);
  }

  componentDidUpdate() {
  }

  renderTask(item, i, type) {

    let cloudImage = Math.ceil(item.weather.clouds / 20);
    return (
      <Box
        name={item.title}
        type={type}
        taskId={item.id}
        isDropped={this.isDropped(item.title)}
        key={i}
      >
        <Task item={item} key={i} onDelete={this.deleteTask.bind(this, item.id)}/>
      </Box>
    )

  }

  handleDrop(index, item, target) {

    const changedTask = this.props.data.filter(element => {
      return element.id == item.taskId;
    });
    changedTask[0].stageProces = target;
    console.log(index, item, target)
    this.props.updateTask(changedTask);

  }


  render() {
    let tasksList = this.props.data;
    const { dustbins } = this.state;


    if (localStorage.getItem("LocalStorageTaskList")) {
      let string = localStorage.getItem("LocalStorageTaskList");
      tasksList = JSON.parse(string);
    }
    return (
      <div className={`page start-page columns`}>
        <div className="dashboard-wr">
          <div className="inside-wr">
            <div className="lists-wr">

              {dustbins.map(({ accepts, id }, index) =>
                <div key={`wr-${index}`} className="list-wrapper">
                  <div className="list-name">
                    <h3>
                      {id}
                    </h3>
                  </div>
                  <Dustbin
                    accepts={accepts}
                    listId={id}
                    onDrop={(item, target) => ::this.handleDrop(index, item, target)}
                    key={index}
                    index={index}>
                    {
                      tasksList.map((item, i)=> {
                        if (item.stageProces == id) {
                          let type = item.stageProces;
                          return this.renderTask(item, i, type)
                        }
                      })
                    }
                  </Dustbin>
                </div>
              )}
            </div>

          </div>


          <div className="builder-task">
            <CreateTask/>
          </div>

        </div>


      </div>



    );
  }
}
