import * as types from '../actions/actionTypes';

export const dataReducer = (state: any[] = [], action: any) => {
  const { type, payload } = action;
  const data = state;
  switch (type) {
    case types.ADD_TASK:
      return [...data, payload];

    case types.DELETE_TASK:
      return data.filter(item =>
        item.id !== payload
      );

    case types.UPDATE_TASK:
      const filteredElements = data.filter(element => {
        return element.eventId !== payload.eventId;
      });

      return [...filteredElements];

    case types.SET_LIST:
      return payload;

    default:
      return state;
  }
};

export default dataReducer;
