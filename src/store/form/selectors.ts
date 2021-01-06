import { getFormValues as getValues, isValid, isPristine } from 'redux-form';

import IState from '@typing/IState';
import IEvent from '@typing/IEvent';
import { EVENT_FORM } from '@configs/forms';

export const getFormValues = (form: string) => getValues(form);

export const isFormValid = (form: string) => isValid(form);

export const isFormPristine = (form: string) => isPristine(form);

export const getEventFormValues = (state: IState): IEvent => (
  (getFormValues(EVENT_FORM)(state) || {}) as IEvent
);
