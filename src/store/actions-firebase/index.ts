import firebase, { User } from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import axios from 'axios';

const config = {
  apiKey: 'AIzaSyAPTIDOWPcKXEaBV2_sbh24JdhS9KL1zu8',
  authDomain: 'tobby-helper.firebaseapp.com',
  databaseURL: 'https://tobby-helper.firebaseio.com',
  projectId: 'tobby-helper',
  storageBucket: 'tobby-helper.appspot.com',
  messagingSenderId: '971465429410',
  appId: '1:971465429410:web:42da6e9e187e0ab4dbe2fb',
  functionsUrl: 'us-central1-todo-manager.cloudfunctions.net',
};

firebase.initializeApp(config);

const firebaseUrl = (url: string) => `https://${config.functionsUrl}/${url}`;

// Local cloud server:
// const fbUrl = url => 'http://localhost:3000/tobby-helper/us-central1/' + url;

export const firebaseAuth = firebase.auth;
export const database = firebase.database();

const firebasePostRequest = async (endpoint: string, data: any) => {
  const token = await getToken();

  return (
    await axios.post(
      firebaseUrl(endpoint),
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          crossDomain: true,
        },
      },
    )
  );
};

export const checkConnection = async () => {
  let result = false;

  await database.ref('.info/connected')
    .on('value', (snap): void => {
      if (snap.val() && window.navigator.onLine) {
        result = true;
      }
    });

  return result;
};

const getToken = async () => {
  const user: User | null =  await firebaseAuth().currentUser;

  if (user) {
    return await user.getIdToken();
  }

  return null;
};

export const handleNotification = async (subject: string, text: string) => {
  const { data } = await firebasePostRequest('handleNotification', { subject, text });

  return data === 'success' ? data : 'reject';
};

export const initUser = async (entryId: string, email: string) => {
  await getToken();
  const { data } = await firebasePostRequest('initUser', { entryId, email });

  if (data && data.token) {
    return firebase.auth().signInWithCustomToken(data.token)
      .then(() => 'Admin Success');
  }

  return 'User';
};
