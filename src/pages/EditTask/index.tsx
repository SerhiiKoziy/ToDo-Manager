import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { useParams } from "react-router-dom";

import CreateTask from '../../components/Task/CreateTask';
import Task from "../../components/Task/Task";

import { StoreState } from "../../store/reducers";
import { deleteTask } from "../../store/actions/tasksActions";

import ITask from '../../types/ITask';

interface IEditTaskProps {
  data: ITask[];
  deleteTask: (taskId: string) => void;
}

const EditTask = ({ data, deleteTask }: IEditTaskProps) => {
  const [ currentTask, setCurrentTask ] = useState<ITask | object>({});
  const { taskId } = useParams();
  useEffect(
    () => {
      const task: ITask | object = data.find((task: any) => task.eventId === taskId) || {};
      setCurrentTask(task)
    },
    [data]
  );

  return (
    <div className="edit-page ">
      {
        currentTask && (
          <Task
            currentTask={currentTask}
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

export default connect((state: StoreState) => ({
  data: state.data,
  // currentTask: null
}), { deleteTask, push })(EditTask);
