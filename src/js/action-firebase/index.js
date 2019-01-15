import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import axios from 'axios';

const config = {
  apiKey: 'AIzaSyC-EQZP9scz08Yq5QjRXgS3zhcntt9-OcM',
  authDomain: 'tobby-helper.firebaseapp.com',
  databaseURL: 'https://tobby-helper.firebaseio.com',
  projectId: 'tobby-helper',
  storageBucket: 'tobby-helper.appspot.com',
  messagingSenderId: '807764475515',
  functionsUrl: 'us-central-tobby-helper.cloudfunctions.net',
};

firebase.initializeApp(config);

const fbUrl = url => `http://${config.functionsUrl}/${url}`;
// const fbUrl = url => 'http://localhost:7777/implant-compare/us-central1/' + url;

async function fbRequest(endpoint, data) {
  const token = await getToken();

  return axios({
    method: 'POST',
    url: fbUrl(endpoint),
    crossDomain: true,
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export const auth = firebase.auth;
export const database = firebase.database();

export function checkConnection() {
  let result = false;
  const connectedRef = firebase.database().ref('.info/connected');
  connectedRef.on('value', snap => {
    if (snap.val() && window.navigator.onLine) {
      result = true;
    }
  });

  return result;
}

async function getToken() {
  const user = auth().currentUser;
  return await user.getIdToken();
}

export async function handleNotification(subject, text) {
  let res = await fbRequest('handleNotification', { subject, text });
  res = res.data;

  return res === 'success' ? res : 'reject';
}

export async function initUser(entryId, email) {
  await getToken();
  let res = await fbRequest('initUser', { entryId, email });
  res = res.data;

  if (res && res.token) {
    return firebase.auth().signInWithCustomToken(res.token).then(() => {
      return 'Admin Success';
    });
  }

  return 'User';
}

function sendRequestComment(endpoint, commentObj) {
  return fbRequest(endpoint, commentObj)
    .then(res => res.data)
    .catch(error => console.error('Error:', error));
}

export function postComment(commentObj) {
  return sendRequestComment('postComment', commentObj);
}
