import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';

const style = {
  // backgroundColor: 'white',
  cursor: 'move',
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      taskId: props.taskId,
    };
  },
};

@DragSource(props => props.type, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired,
  };

  render() {
    const { name, isDropped, children, isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div style={{ ...style }} className={`task-draggable ${isDragging ? 'is-dragging' : ''}`}>
        {/* isDropped ?
         <s>{name}</s> :
         name*/
        }
        {children}
      </div>,
    );
  }
}
