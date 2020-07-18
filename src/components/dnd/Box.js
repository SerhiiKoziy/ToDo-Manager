import React, { PureComponent } from 'react';
import { DragSource as dragSource } from 'react-dnd';

const style = {
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

class Box extends PureComponent {
  // static propTypes = {
  //   connectDragSource: PropTypes.func.isRequired,
  //   isDragging: PropTypes.bool.isRequired,
  //   children: PropTypes.any,
  //   type: PropTypes.string.isRequired,
  //   isDropped: PropTypes.bool.isRequired,
  // };

  render() {
    const { children, isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div style={{ ...style }} className={`task-draggable ${isDragging ? 'is-dragging' : ''}`}>
        {children}
      </div>,
    );
  }
}

export default dragSource(props => {
  return props.type;
},
  boxSource,
  (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    };
  }
)(Box);
