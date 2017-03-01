import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const knightSource = {
  beginDrag() {
    return {};
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

@DragSource(ItemTypes.KNIGHT, knightSource, collect)
export default class Knight extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const img = new Image();
    img.src = '';
    img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          cursor: 'move',
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        ♘
      </div>,
    );
  }
}
