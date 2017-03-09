import React, { PropTypes, PureComponent } from 'react';
import { DropTarget as dropTarget } from 'react-dnd';

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem(), props.listId);
  },
};

class Dustbin extends PureComponent {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
    listId: PropTypes.string,
  };

  render() {
    const { isOver, canDrop, connectDropTarget } = this.props;
    const isActive = isOver && canDrop;

    const classList = ['list', 'back-list'];

    if (isActive) {
      classList.push('is-active');
    }

    if (canDrop) {
      classList.push('can-drop');
    }

    return connectDropTarget(
      <div className={classList.join(' ')}>
        {this.props.children}
      </div>,
    );
  }
}
export default dropTarget(props => {
  return props.accepts;
}, dustbinTarget,
  (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    };
  })(Dustbin);

