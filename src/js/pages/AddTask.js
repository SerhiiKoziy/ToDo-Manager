import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CreateTask from '../components/Task/CreateTask';

class AddTask extends PureComponent {
  render() {
    return (
      <div className="builder-task edit-builder-task">
        <CreateTask
          buttonText="Add event"
        />
      </div>
    );
  }
}

export default connect((state) => ({ data: state.data })
)(AddTask);

