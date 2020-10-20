import React, { ReactNode } from 'react';
import { DragSource as dragSource } from 'react-dnd';
import classNames from "classnames";

import styles from "./styles.module.scss";

const boxSource = {
  beginDrag(props: any) {
    return {
      name: props.name,
      eventId: props.eventId,
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
            }
          )
        }
      >
        {children}
      </div>,
    )
  )
};

export default dragSource(
  (props: any) => props.type,
  boxSource,
  (connect: any, monitor: any) => {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    };
  }
)(DragBox);
