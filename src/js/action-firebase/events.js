import { database } from './index';
import firebase from 'firebase/app';

export async function getAllEventsDatabase(callbackEvents) {
  const user = await firebase.auth().currentUser;
  const ref = database.ref('events');

  return user && await ref.orderByChild('uid').equalTo(user.uid).on('value', (snapshot) => {
    callbackEvents(snapshot.val());
  });
}

export function postEventFirebase(newEvent) {
  const myRef = database.ref('events/').push();
  // uploadNewEventCallback(myRef.key);
  const newEventChanged = newEvent;
  newEventChanged.id = myRef.key;

  return myRef.set(newEventChanged);
}

export async function putEventFirebase(obj, eventId) {
  try {
    return await database.ref(`events/${eventId}/`).update(obj);
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
