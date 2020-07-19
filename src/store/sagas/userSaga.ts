// Vendor imports
import { takeLatest, put, all, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import * as actionTypes from "../actions/actionTypes";
import { SelectTrim, SelectTrimColor } from "../actions";
import {
  getCurrentModel,
  getCurrentTrim,
  getCurrentModelTrims,
} from "../selectors";
import { sortByPrice, getUpdatedTrim } from "./helperFunctions";
import {
  setCurrentModel,
  FetchModel,
  startFetching,
  stopFetching,
  setCurrentTrim,
} from "../actions/";

import {
  CurrentModel,
  CurrentModelWithSelectedTrim,
} from "./types";

import firebase from "firebase";

function* fetchUser({ id }: FetchModel) {
  try {
    yield put(startFetching());
    const { data }: { data: CurrentModel } = yield axios.get(`model/${id}`);
    firebase.auth().onAuthStateChanged(user => {
      saveUserClaimsAction(user);

      if (user) {
        getAllEventsDatabase(callbackEvents)
          .then((res: any) => {
            console.log('res', res)
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
    });

    const [chiepestTrim] = data.trims.sort(sortByPrice);
    const initiallySelectedTrim = getUpdatedTrim(chiepestTrim);
    const currentModelWithCheapestTrim: CurrentModelWithSelectedTrim = {
      ...data,
      currentTrim: initiallySelectedTrim,
    };
    yield put(setCurrentModel(currentModelWithCheapestTrim));
    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export default function* modelSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_USER, fetchUser),
  ]);
}
