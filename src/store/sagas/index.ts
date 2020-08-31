// Vendor imports
import { all, fork } from "redux-saga/effects";
// Imports
import taskSaga from "./taskSaga";
import userSaga from "../user/userSaga";
import formSaga from "../form/sagas";

export default function* rootSaga() {
  yield all([fork(taskSaga), fork(userSaga), fork(formSaga)]);
}
