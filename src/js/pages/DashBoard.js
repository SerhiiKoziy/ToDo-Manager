import React, { Component } from 'react';
import { deleteTask, updateTask } from '../actions';
import { connect } from 'react-redux';
import CreateTask from '../components/Task/CreateTask';
import Task from '../components/Task/Task';
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import Dustbin from '../components/dnd/Dustbin';
import Box from '../components/dnd/Box';
import ItemTypes from '../components/dnd/ItemTypes';

class DashBoard extends Component {
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
        <Task item={item} key={i} onDelete={this.deleteTask.bind(this, item.id)} />
      </Box>
    );
  }

  handleDrop(index, item, target) {
    const changedTask = this.props.data.filter(element => {
      return element.id == item.taskId;
    });
    changedTask[0].stageProces = target;
    this.props.updateTask(changedTask);
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
                if (item.stageProces == id) {
                  let type = item.stageProces;
                  return this.renderTask(item, i, type);
                }
              })
            }
          </Dustbin>
        </div>
      );
    }
    );
  }

  render() {
    return (
      <div className={'page start-page columns'}>
        <div className="dashboard-wr">
          <div className="inside-wr">
            <div className="lists-wr">
              {this.renderDustbins()}
            </div>
          </div>
          <div className="builder-task">
            <CreateTask />
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedComponent = connect(
  (state) => {
    return { data: state.data };
  },
  {
    deleteTask, updateTask,
  }
)(DashBoard);

export default DragDropContext(HTML5Backend)(ConnectedComponent);
