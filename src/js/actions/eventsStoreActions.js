import * as types from '../constants/ActionTypes';
import { getAllEventsDatabase } from '../action-firebase/events';

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

  // if (eventsList && eventsList.length > 0) setList(eventsList);

  console.log('eventsList', eventsList);
  return (eventsList && eventsList.length > 0) && eventsList;
}

export function addAllEventsStore(payload) {
  return {
    type: types.ADD_ALL_EVENTS,
    payload,
  };
}
