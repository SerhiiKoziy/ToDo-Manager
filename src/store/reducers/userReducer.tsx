import * as types from '../actions/actionTypes';

const userReducer = (state: any = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADD_USER:
      return payload;

    case types.ADD_USER_CLAIMS:
      return payload;

    case types.DELETE_USER:
      return {};

    default:
      return state;
  }
};

export default userReducer;
