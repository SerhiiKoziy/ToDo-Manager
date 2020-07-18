import { formValueSelector, getFormValues as getValues, isValid, isPristine } from 'redux-form';

export const getFormValue = (form: string) => formValueSelector(form);
export const getFormValues = (form: string) => getValues(form);
export const isFormValid = (form: string) => isValid(form);
export const isFormPristine = (form: string) => isPristine(form);
