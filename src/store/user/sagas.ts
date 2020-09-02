import { put, call, takeLatest } from "redux-saga/effects";

import {
  startFetching,
  stopFetching,
} from "../actions";

import { setUserMeta } from './actionCreators';

import firebase from "firebase";

export const USER_REQUESTED = "USER_REQUESTED";

//TODO change Promise
const getCurrentUserMeta = (auth: any) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

function* requestUserAsync() {
  try {
    yield put(startFetching());

    const auth = firebase.auth();
    const getUserMeta = () => getCurrentUserMeta(auth).then((user: any) => user);
    const { uid, displayName, email, emailVerified, providerData, photoURL, phoneNumber }: any = yield call(getUserMeta);

    yield put(setUserMeta({ uid, displayName, email, emailVerified, providerData, photoURL, phoneNumber }));

    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export default function* watcher() {
  yield takeLatest(USER_REQUESTED, requestUserAsync);
}
