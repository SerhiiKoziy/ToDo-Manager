// Vendor imports
import { all, fork } from "redux-saga/effects";
// Imports
import listSaga from "./listSaga";
import modelSaga from "./modelSaga";
import formSaga from "../form/sagas";

export type {
  Model,
  CurrentModelTrim,
  ModelTrim,
  TrimColor,
  CurrentModelWithSelectedTrim,
} from "./types";

export default function* rootSaga() {
  yield all([fork(listSaga), fork(modelSaga), fork(formSaga)]);
}
