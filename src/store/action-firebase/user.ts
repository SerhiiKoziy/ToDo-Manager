import { database } from './index';

export async function loadUserInfo(uid: string) {
  try {
    const result = await database.ref(`users/${uid}/`).once('value');
    const resultData = result.val();

    console.log('resultData', resultData)
    return resultData;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

export async function uploadUserInfo(obj: any, uid: string) {
  try {
    return await database.ref(`users/${uid}/`).update(obj);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}
