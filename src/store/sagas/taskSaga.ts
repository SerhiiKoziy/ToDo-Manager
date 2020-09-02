// Vendor imports
import { takeLatest, put, all, select } from "redux-saga/effects";
// import { push } from "react-router-redux";
// import axios from "axios";
// Imports
import * as actionTypes from "../actions/actionTypes";
import {
  startFetching,
  stopFetching,
} from "../actions/";

function* fetchModel({ id }: any) {
  try {
    yield put(startFetching());

    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

//TODO add to events

// await getAllEventsDatabase()
//   .then((res: any) => {
//     console.log('res', res)
//     return res
//   })
//   .catch((error) => {
//     console.log('error', error)
//   });

export default function* modelSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_MODEL, fetchModel),
  ]);
}
