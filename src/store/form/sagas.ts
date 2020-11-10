import { takeLatest, select } from 'redux-saga/effects';
import { submit } from 'redux-form';

import { isFormValid, isFormPristine } from './selectors';

export const VALIDATE_EVENT_FORM = 'VALIDATE_EVENT_FORM';

function* validateEventForm() {
//   const isPriceFormValid = yield select(isFormValid(CHANGE_PRICE_FORM));
//   // const isPriceFormPristine = yield select(isFormPristine(CHANGE_PRICE_FORM));
//   // const businessType = yield select(getBusinessTypeFilter);
//
//   // if (businessType === businessTypes.leaseCar) {
//   //   const isLeasingFormPrstine = yield select(isFormPristine(LEASING_OPTIONS_REQUESTED));
//   //   const isLeasingOptionFormValid = yield select(isFormValid(LEASING_OPTIONS_PRICE_FORM));
//   //
//   //   if (isLeasingFormPrstine && !isLeasingOptionFormValid) return;
//   // }
//
//   if (isPriceFormValid) {
//     yield put(submit(CHANGE_PRICE_FORM));
//   }
}

export default function* watcher() {
  yield takeLatest(VALIDATE_EVENT_FORM, validateEventForm);
}
