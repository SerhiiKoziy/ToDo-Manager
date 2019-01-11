import { database } from './index';

export async function getAllEventsInfo() {
  const entries = await database.ref('events').once('value');
  const obj = entries.val();
  const list = [];
  console.log('obj', obj);
  for (const key in obj) {
    list.push(obj[key]);
  }

  return list;
}

export function postNewEvent(newEvent) {
  const myRef = database.ref('events/').push();
  // uploadNewEventCallback(myRef.key);
  newEvent.id = myRef.key;

  return myRef.set(newEvent);
}

export async function putEventInfo(obj, uid) {
  try {
    return await database.ref(`events/${uid}/`).update(obj);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteEvent(uid) {
  try {
    return await database.ref(`events/${uid}/`).remove();
  } catch (err) {
    return Promise.reject(err);
  }
}
