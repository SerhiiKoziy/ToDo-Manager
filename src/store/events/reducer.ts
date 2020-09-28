import IEvent from '../../types/IEvent'

export interface IEventsState {
  list: IEvent[];
  currentEvent: IEvent | null;
  isLoading: boolean;
}

const defaultEventsReducer = {
  list: [],
  currentEvent: null,
  isLoading: false,
};

export const SET_EVENTS = "SET_EVENTS";
export const SET_CURRENT_EVENT = "SET_CURRENT_EVENT";

export const eventsReducer = (state: IEventsState = defaultEventsReducer, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_EVENTS:
      return {
        ...state,
        list: payload
      };

    case SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: payload,
      };

    default:
      return state;
  }
};

export default eventsReducer;
