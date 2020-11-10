import IEvent from '@typing/IEvent'

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

export const LOADING_EVENT = 'LOADING_EVENT';
export const SET_EVENTS = "SET_EVENTS";
export const SET_CURRENT_EVENT = "SET_CURRENT_EVENT";
export const RESET_CURRENT_EVENT = "RESET_CURRENT_EVENT";

export const eventsReducer = (state: IEventsState = defaultEventsReducer, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING_EVENT:
      return {
        ...state,
        isLoading: payload
      };

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

    case RESET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: null,
      };

    default:
      return state;
  }
};

export default eventsReducer;
