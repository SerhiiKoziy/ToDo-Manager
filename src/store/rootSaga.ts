// Vendor imports
import { all, fork } from "redux-saga/effects";
// Imports
import userSagas from "./user/sagas";
import taskSaga from "./sagas/taskSaga";
import formSaga from "./form/sagas";

const sagas = [
  userSagas,
  taskSaga,
  formSaga
];

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}
