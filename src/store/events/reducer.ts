// import IEvents from '../../types/IEvents'

export interface IEventsState {
  events: any[] | null;
  isLoading: boolean;
}

export const SET_EVENTS = "SET_EVENTS";
export const UPDATE_EVENT = "UPDATE_EVENT";

export const eventsReducer = (state: object = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_EVENTS:
      return {
        ...state,
        events: payload,
      };

    case UPDATE_EVENT:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default eventsReducer;
