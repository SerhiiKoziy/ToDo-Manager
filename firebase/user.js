import firebase from 'firebase';
import { database } from './index';

export async function loadUserInfo(uid) {
  try {
    let result = await database.ref(`users/${uid}/`).once('value');
    result = result.val();
    return result;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

export async function uploadUserInfo(obj, uid) {
  try {
    const result = await database.ref(`users/${uid}/`).update(obj);
    return result;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}
