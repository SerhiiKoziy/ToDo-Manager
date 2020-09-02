// Vendor imports
import { all, fork } from "redux-saga/effects";
// Imports
import userSagas from "./user/sagas";
import eventsSagas from "./events/sagas";
import formSaga from "./form/sagas";

const sagas = [
  userSagas,
  eventsSagas,
  formSaga
];

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}
