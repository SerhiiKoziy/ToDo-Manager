// Vendor imports
import { takeLatest, put, call, all, select } from "redux-saga/effects";

import { push } from "react-router-redux";
import axios from "axios";

import * as actionTypes from "../actions/actionTypes";

import {
  startFetching,
  stopFetching,
} from "../actions";

import { getAllEventsDatabase } from '../../store/action-firebase/events';

import firebase from "firebase";

const requestUserData = () => (
  firebase.auth().onAuthStateChanged(user => {
    // saveUserClaimsAction(user);
    console.log('values2111', user);
    const callbackEvents = (values: any) => {
      console.log('values3333', values);

      return values
    };
    if (user) {
      getAllEventsDatabase(callbackEvents)
        .then((res: any) => {
          console.log('res', res)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }

    console.log('callbackEvents', callbackEvents);

    return callbackEvents;
  })
);

function* fetchUser() {
  try {
    // yield put(startFetching());
    // const { data }: { data: CurrentModel } = yield axios.get(`model/${id}`);
    console.log('1111')
    const a = yield call(requestUserData);

    console.log('4444', a)

    // const [chiepestTrim] = data.trims.sort(sortByPrice);
    // const initiallySelectedTrim = getUpdatedTrim(chiepestTrim);
    // const currentModelWithCheapestTrim: CurrentModelWithSelectedTrim = {
    //   ...data,
    //   currentTrim: initiallySelectedTrim,
    // };
    // yield put(setCurrentModel(currentModelWithCheapestTrim));
    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_USER, fetchUser),
  ]);
}
