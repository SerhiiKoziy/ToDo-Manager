// Vendor imports
import { takeLatest, put, all } from "redux-saga/effects";
import axios from "axios";
// Imports
import * as actionTypes from "../actions/actionTypes";
import { setListOfModels, startFetching, stopFetching } from "../actions";
// Types import
import { Model } from "./types";

function* fetchListOfCars() {
  try {
    yield put(startFetching());
    const { data }: { data: Model[] } = yield axios.get("/models");
    yield put(setListOfModels(data));
    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export default function* listSaga() {
  yield all([takeLatest(actionTypes.FETCH_LIST_OF_CARS, fetchListOfCars)]);
}
