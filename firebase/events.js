import { database } from './index';
import firebase from 'firebase';
import { updateStorage } from '../src/js/actions';


// async function callbackEvents(messages) {
//   const eventsList = [];
//
//   for (const key in messages) {
//     const messageInfo = messages[key];
//     eventsList.push(messageInfo);
//   }
//
//   console.log('eventsList', eventsList);
//
//   updateStorage(eventsList);
//   // return eventsList;
// }

export async function getAllEventsInfoDatabase(callbackEvents) {
  const user = await firebase.auth().currentUser;

  console.log('22222', user && user.uid);

  return user && await database.ref('events').orderByChild('uid').equalTo(user.uid).on('value', (snapshot) => {
    snapshot && callbackEvents(snapshot.val());
  });
}

// export async function getAllEventsInfo(callbackEvents) {
//   const res = await getAllEventsInfoDatabase(callbackEvents);
//   console.log('res11111', res);
// }

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
