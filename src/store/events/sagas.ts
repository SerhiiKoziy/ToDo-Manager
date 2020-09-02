import firebase from "firebase";
import { put, call, select, takeLatest } from "redux-saga/effects";

import {
  startFetching,
  stopFetching,
} from "../actions";

import { setEvents } from './actionCreators';
import { getUserMeta } from '../user/selectors';

import IUserMeta from "../../types/IUserMeta";


export const EVENTS_REQUESTED = "EVENTS_REQUESTED";

//TODO add to events

// await getAllEventsDatabase()
//   .then((res: any) => {
//     console.log('res', res)
//     return res
//   })
//   .catch((error) => {
//     console.log('error', error)
//   });

//TODO change Promise
const getCurrentUserMeta = (auth: any) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

function* requestEventsAsync() {
  try {
    yield put(startFetching());
    const user: IUserMeta | null = yield select(getUserMeta);

    console.log('user', user);

    const auth = firebase.auth();
    const getEvents = () => getCurrentUserMeta(auth).then((user: any) => user);
    const events: any = yield call(getEvents);

    yield put(setEvents(events));

    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export default function* watcher() {
  yield takeLatest(EVENTS_REQUESTED, requestEventsAsync);
}
