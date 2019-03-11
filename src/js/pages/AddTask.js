import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CreateTask from '../components/Task/CreateTask';

class AddTask extends PureComponent {
  render() {
    // const currentTask = this.props.data.find(item => {
    //   return item.id === this.props.params.taskId;
    // });

    return (
      <div className="builder-task edit-builder-task">
        <CreateTask
          currentTask={{}}
          buttonText="Edit event"
        />
      </div>
    );
  }
}

export default connect((state) => ({ data: state.data })
)(AddTask);

