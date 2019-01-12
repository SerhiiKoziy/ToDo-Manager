import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CreateTask from '../components/Task/CreateTask';

class EditTask extends PureComponent {
  render() {
    const currentTask = this.props.data.find(item => {
      return item.id === parseFloat(this.props.params.taskId);
    });

    return (
      <div className="builder-task edit-builder-task">
        <CreateTask
          key={currentTask.updatedAt}
          currentTask={currentTask || {}}
          buttonText="Edit event"
        />
      </div>
    );
  }
}

export default connect((state) => {
  return { data: state.data };
})(EditTask);

