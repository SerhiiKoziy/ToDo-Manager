import { database } from './index';

import IUserMeta from '@typing/IUserMeta';

export async function loadUserInfo(uid: string) {
  try {
    const result = await database.ref(`users/${uid}/`).once('value');

    return result.val();
  } catch (err) {
    console.error(err);

    return Promise.reject(err);
  }
}

export async function uploadUserInfo(user: IUserMeta, uid: string) {
  try {
    return await database.ref(`users/${uid}/`).update(user);
  } catch (err) {
    console.error(err);

    return Promise.reject(err);
  }
}
