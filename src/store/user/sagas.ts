import { put, call, takeLatest } from 'redux-saga/effects';

import { startFetching, stopFetching } from '../loading/actionCreators';

import { setUserMeta } from './actionCreators';

import firebase, { auth } from 'firebase';

export const USER_REQUESTED = 'USER_REQUESTED';

//TODO change Promise
const getCurrentUserMeta = (auth: auth.Auth) => {
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
    console.error("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export default function* watcher() {
  yield takeLatest(USER_REQUESTED, requestUserAsync);
}
