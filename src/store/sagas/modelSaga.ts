// Vendor imports
import { takeLatest, put, all, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";
// Imports
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
// Types import
import {
  CurrentModel,
  CurrentModelTrim,
  CurrentModelWithSelectedTrim,
  ModelTrim,
} from "./types";

function* fetchModel({ id }: FetchModel) {
  try {
    yield put(startFetching());
    const { data }: { data: CurrentModel } = yield axios.get(`model/${id}`);
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

function* selectTrim({ name }: SelectTrim) {
  const trims: ModelTrim[] = yield select(getCurrentModelTrims);
  const { colorName }: CurrentModelTrim = yield select(getCurrentTrim);
  const selectedTrim = trims.find((trim) => {
    return trim.name === name;
  });
  const color = selectedTrim?.colors.find((color) => {
    return color.name === colorName;
  });

  if (selectedTrim) {
    let trim: CurrentModelTrim;
    if (color) {
      trim = getUpdatedTrim(selectedTrim, color);
    } else {
      trim = getUpdatedTrim(selectedTrim, colorName);
    }

    yield put(setCurrentTrim(trim));
  }
}

function* selectTrimColor({ name }: SelectTrimColor) {
  const currentTrim: CurrentModelTrim = yield select(getCurrentTrim);
  const trimColor = currentTrim.colors.find((color) => {
    return color.name === name;
  });
  if (trimColor) {
    const updatedSelectedTrim = getUpdatedTrim(currentTrim, trimColor);
    yield put(setCurrentTrim(updatedSelectedTrim));
  }
}

function* proceedRequest() {
  try {
    yield put(startFetching());
    const { name: modelName }: CurrentModel = yield select(getCurrentModel);
    const { colorName, name: trimName }: CurrentModelTrim = yield select(
      getCurrentTrim
    );
    yield axios.post("./lead", {
      modelName,
      trimName,
      colorName,
    });
    yield put(push("/checkout/success"));
    yield put(stopFetching());
  } catch {
    yield put(push("/checkout/failure"));
    yield put(stopFetching());
  }
}

export default function* modelSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_MODEL, fetchModel),
    takeLatest(actionTypes.SELECT_TRIM, selectTrim),
    takeLatest(actionTypes.SELECT_TRIM_COLOR, selectTrimColor),
    takeLatest(actionTypes.PROCEED_REQUEST, proceedRequest),
  ]);
}
