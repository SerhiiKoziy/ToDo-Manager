import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import axios from 'axios';

const config = {
  apiKey: "AIzaSyAPTIDOWPcKXEaBV2_sbh24JdhS9KL1zu8",
  authDomain: "tobby-helper.firebaseapp.com",
  databaseURL: "https://tobby-helper.firebaseio.com",
  projectId: "tobby-helper",
  storageBucket: "tobby-helper.appspot.com",
  messagingSenderId: "971465429410",
  appId: "1:971465429410:web:42da6e9e187e0ab4dbe2fb"
};

firebase.initializeApp(config);

const firebaseUrl = url => `https://${config.functionsUrl}/${url}`;

// Local cloud server:
// const fbUrl = url => 'http://localhost:3000/tobby-helper/us-central1/' + url;

async function fbRequest(endpoint, data) {
  const token = await getToken();

  return axios({
    method: 'POST',
    url: firebaseUrl(endpoint),
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
  const { data } = await fbRequest('handleNotification', { subject, text });

  return data === 'success' ? data : 'reject';
}

export async function initUser(entryId, email) {
  await getToken();
  const { data } = await fbRequest('initUser', { entryId, email });

  if (data && data.token) (
    firebase.auth().signInWithCustomToken(data.token)
      .then(() => 'Admin Success')
  );

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
