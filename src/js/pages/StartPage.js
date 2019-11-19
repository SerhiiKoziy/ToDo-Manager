import React, { Component } from 'react';
import { deleteTask, editTaskAction } from '../actions';
import { connect } from 'react-redux';
import CreateTask from '../components/Task/CreateTask';
import Task from '../components/Task/Task';
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import Dustbin from '../components/dnd/Dustbin';
import Box from '../components/dnd/Box';
import ItemTypes from '../components/dnd/ItemTypes';

import './startPage.scss';

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [
        {
          accepts: [ItemTypes.INPROGRES, ItemTypes.DONE],
          lastDroppedItem: null,
          id: ItemTypes.TODO,
        },
        {
          accepts: [ItemTypes.TODO, ItemTypes.DONE],
          lastDroppedItem: null,
          id: ItemTypes.INPROGRES,
        },
        {
          accepts: [ItemTypes.TODO, ItemTypes.INPROGRES, NativeTypes.URL],
          lastDroppedItem: null,
          id: ItemTypes.DONE,
        },
      ],
      droppedBoxNames: [],
    };

    this.handleDrop = this.handleDrop.bind(this);
  }

  static propTypes = {
    deleteTask: React.PropTypes.func,
    updateTask: React.PropTypes.func,
    data: React.PropTypes.array,
  };

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }

  deleteTask(taskId) {
    this.props.deleteTask(taskId);
  }

  renderTask(item, i, type) {
    return (
      <Box
        name={item.title}
        type={type}
        taskId={item.id}
        isDropped={this.isDropped(item.title)}
        key={i}
      >
        <Task
          currentTask={item}
          key={i}
          onDelete={this.deleteTask.bind(this, item.id)}
          className={"onBoard-task"}
        />
      </Box>
    );
  }

  renderTaskMobile(item, i) {
    return (
      item && <Task currentTask={item} key={i} onDelete={this.deleteTask.bind(this, item.id)} />
    );
  }

  handleDrop(index, item, target) {
    const changedTask = this.props.data.filter(element => {
      return element.id == item.taskId;
    })[0];

    changedTask.stageProces = target;
    this.props.editTaskAction(changedTask);
  }

  renderDustbins() {
    return this.state.dustbins.map(({ accepts, id }, index) => {
      return (
        <div key={`wr-${index}`} className="list-wrapper">
          <div className="list-name">
            <h3>
              {id}
            </h3>
          </div>
          <Dustbin
            accepts={accepts}
            listId={id}
            onDrop={(item, target) => {
              return ::this.handleDrop(index, item, target);
            }}
            key={index}
            index={index}
          >
            {
              this.props.data && this.props.data.map((item, i) => {
                if (item.stageProces === id) {
                  const type = item.stageProces;
                  return this.renderTask(item, i, type);
                }

                return null;
              })
            }
          </Dustbin>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="page start-page columns">
        <div className="dashboard-wr">
          <div className="inside-wr">
            <div className="lists-wr desktop">
              {this.renderDustbins()}
            </div>
            <div className="lists-wr mobile">
              <div className="list">
                {
                  this.props.data && this.props.data.map((item, i) => {
                    return this.renderTaskMobile(item, i);
                  })
                }
              </div>
            </div>
          </div>
          <div className="builder-task mobile">
            <CreateTask />
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedComponent = connect(
  (state) => ({ data: state.data }),
  {
    deleteTask, editTaskAction
  }
)(StartPage);

export default DragDropContext(HTML5Backend)(ConnectedComponent);
