import { takeLatest, select } from 'redux-saga/effects';
import { submit } from 'redux-form';

// import { CHANGE_PRICE_FORM, LEASING_OPTIONS_PRICE_FORM } from '^config/forms';
// import businessTypes from '^config/businessTypes';
//
// import put from '^utils/sagaPut';
//
// import { getBusinessTypeFilter } from '^store/filters/selectors';
// import { LEASING_OPTIONS_REQUESTED } from '^store/leasingOptions/sagas';

import { isFormValid, isFormPristine } from './selectors';

export const VALIDATE_TASK_FORM = 'VALIDATE_TASK_FORM';

function* validateTaskForm() {
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
  yield takeLatest(VALIDATE_TASK_FORM, validateTaskForm);
}
