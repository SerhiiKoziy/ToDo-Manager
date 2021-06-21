import React, { ReactNode } from 'react';
import { DragSource as dragSource } from 'react-dnd';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface IBoxSource {
  name: string;
  eventId: string;
}

const boxSource = {
  beginDrag({ name, eventId }: IBoxSource) {
    return {
      name,
      eventId,
    };
  },
};

interface IDragBox {
  children: ReactNode;
  isDragging: boolean;
  connectDragSource: (element: any) => void;
}

const DragBox = ({ children, isDragging, connectDragSource }: IDragBox) => {
  return (
    connectDragSource(
      <div
        style={{ cursor: 'move' }}
        className={
          classNames(
            styles.taskDraggable,
            {
              [styles.isDragging]: isDragging,
            },
          )
        }
      >
        {children}
      </div>,
    )
  );
};

export default dragSource(
  (props: any) => props.type,
  boxSource,
  (connect: any, monitor: any) => {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    };
  },
)(DragBox);
