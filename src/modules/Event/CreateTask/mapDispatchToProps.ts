import { bindActions } from '../../../utils/bindActions';

import { createTaskAction, editTaskAction } from "../../../store/actions/tasksActions";

export default bindActions({
  createTaskAction,
  editTaskAction,
});
