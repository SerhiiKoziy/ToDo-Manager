import * as types from '../constants/ActionTypes';

export function setList(payload) {
  return {
    type: types.SET_LIST,
    payload,
  };
}

async function callbackEvents(events) {
  const eventsList = [];

  for (const key in events) {
    const messageInfo = events[key];
    eventsList.push(messageInfo);
  }

  return (eventsList && eventsList.length > 0) && eventsList;
}

export function addAllEventsStore(payload) {
  return {
    type: types.ADD_ALL_EVENTS,
    payload,
  };
}
