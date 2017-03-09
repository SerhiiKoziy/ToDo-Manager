import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';

const style = {
  //color: 'white',
};

const dustbinTarget = {
  drop(props, monitor) {
    //console.log(props.id, monitor)
    props.onDrop(monitor.getItem(), props.listId);
  },
};

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
  };

  render() {
    const { accepts, isOver, canDrop, connectDropTarget, listId } = this.props;
    const isActive = isOver && canDrop;

    const classList = ['list', 'back-list'];

    if (isActive) {
      classList.push('is-active');
    }

    if (canDrop) {
      classList.push('can-drop');
    }

    return connectDropTarget(
      <div className={classList.join(' ')} style={{ ...style }}>
        {this.props.children}
      </div>,
    );
  }
}
