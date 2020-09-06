import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { useParams } from "react-router-dom";

import CreateTask from '../../components/Task/CreateTask';
import Index from "../../components/Task";

import IState from "../../types/IState";
import { deleteTask } from "../../store/actions/tasksActions";

import IEvent from '../../types/IEvent';

interface IEditTaskProps {
  events: IEvent[];
  deleteTask: (taskId: string) => void;
}

const EditTask = ({ events, deleteTask }: IEditTaskProps) => {
  const [ currentTask, setCurrentTask ] = useState<IEvent>();
  const { taskId } = useParams();

  useEffect(
    () => {
      const task: IEvent | undefined = events.find((task: any) => task.eventId === taskId);
      task && setCurrentTask(task)
    },
    [events]
  );

  return (
    <div className="edit-page ">
      {
        currentTask && (
          <Index
            event={currentTask}
            onDelete={() => deleteTask(taskId)}
          />
        )
      }
      <div className="builder-task">
        <CreateTask
          // key={currentTask.updatedAt}
          currentTask={currentTask || {}}
          isEdit={true}
          buttonText="Edit event"
        />
      </div>
    </div>
  )
};

export default connect((state: IState) => ({
  events: state.events.events,
}), { deleteTask, push })(EditTask);
