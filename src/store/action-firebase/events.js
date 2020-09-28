import { database } from './index';
import firebase from 'firebase/app';

export async function getEventsFirebase() {
  const user = await firebase.auth().currentUser;
  const ref = database.ref('events');

  return user && await ref.orderByChild('uid').equalTo(user.uid).once('value').then((snapshot) => {
    return snapshot.val();
  });
}

export async function postEventFirebase(newEvent) {
  const myRef = database.ref('events/').push();
  const newEventChanged = newEvent;
  newEventChanged.eventId = myRef.key;

  return await myRef.set(newEventChanged);
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
