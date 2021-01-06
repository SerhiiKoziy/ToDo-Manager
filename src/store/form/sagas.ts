import { takeLatest } from 'redux-saga/effects';

export const VALIDATE_EVENT_FORM = 'VALIDATE_EVENT_FORM';

function* validateEventForm() {
  //TODO add validation
}

export default function* watcher() {
  yield takeLatest(VALIDATE_EVENT_FORM, validateEventForm);
}
