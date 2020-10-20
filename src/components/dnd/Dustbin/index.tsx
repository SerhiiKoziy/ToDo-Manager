import React, { useMemo, ReactNode } from 'react';
import { DropTarget as dropTarget } from 'react-dnd';

import styles from "./styles.module.scss";
import classNames from "classnames";

const dustbinTarget = {
  drop(props: any, monitor: any) {
    props.onDrop(monitor.getItem(), props.listId);
  },
};

interface IDustbin {
  isOver: boolean;
  canDrop: boolean;
  connectDropTarget: any;
  children: ReactNode;
}

const Dustbin = ({ isOver, canDrop, connectDropTarget, children }: IDustbin): ReactNode => {
  const isActive = useMemo(
    () => isOver && canDrop,
    [isOver && canDrop]
  );

  return (
    connectDropTarget(
      <div
        className={
          classNames(
            styles.list,
            {
              [styles.isActive]: isActive,
              [styles.canDrop]: canDrop,
            }
          )
        }
      >
        {children}
      </div>,
    )
  )
};

export default dropTarget(
  (props: any) => props.accepts,
  dustbinTarget,
  (connect: any, monitor: any) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)(Dustbin);
