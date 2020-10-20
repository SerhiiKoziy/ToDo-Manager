import React, { PureComponent } from 'react';
import { DragSource as dragSource } from 'react-dnd';

const style = {
  cursor: 'move',
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      eventId: props.eventId,
    };
  },
};

class Box extends PureComponent {
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
