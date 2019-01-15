import { database } from './index';
import firebase from 'firebase/app';

export async function getAllEventsInfoDatabase(callbackEvents) {
  const user = await firebase.auth().currentUser;
  const ref = database.ref('events');

  return user && await ref.orderByChild('uid').equalTo(user.uid).on('value', (snapshot) => {
    callbackEvents(snapshot.val());
  });
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
