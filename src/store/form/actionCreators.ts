import { submit } from 'redux-form';

import { TASK_FORM } from '../../configs/forms';

// import { actionFactory } from '^utils/storeHelper';

// import { VALIDATE_VARIANT_PRICE_FORM } from './sagas';

// export const validateChangePriceForm = () => actionFactory(VALIDATE_VARIANT_PRICE_FORM);
export const validateTaskForm = () => submit(TASK_FORM);
