import { database } from './index';
import firebase from 'firebase/app';
import IEvent from '@typing/IEvent';

export async function getEventsFirebase() {
  const user = await firebase.auth().currentUser;
  const ref = database.ref('events');

  return user && await ref.orderByChild('uid').equalTo(user.uid).once('value').then((snapshot) => {
    return snapshot.val();
  });
}

export async function postEventFirebase(newEvent: IEvent) {
  const myRef = database.ref('events/').push();

  if (myRef && myRef.key) {
    const newEventChanged = newEvent;
    newEventChanged.eventId = myRef.key;

    return await myRef.set(newEventChanged);
  }
}

export async function putEventFirebase(event: IEvent, eventId: string) {
  try {
    return await database.ref(`events/${eventId}/`).update(event);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteEvent(eventId: string) {
  try {
    return await database.ref(`events/${eventId}/`).remove();
  } catch (err) {
    return Promise.reject(err);
  }
}
