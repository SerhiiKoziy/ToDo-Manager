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

const fbUrl = url => `https://${config.functionsUrl}/${url}`;

// Local cloud server:
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

const getToken = async () => {
  const user = auth().currentUser;

  return await user.getIdToken();
};

export const handleNotification = async(subject, text) => {
  const { data } = await fbRequest('handleNotification', { subject, text });

  return data === 'success' ? data : 'reject';
};

export async function initUser(entryId, email) {
  await getToken();
  const { data } = await fbRequest('initUser', { entryId, email });

  if (data && data.token) {
    return firebase.auth().signInWithCustomToken(data.token).then(() => {
      return 'Admin Success';
    });
  }

  return 'User';
};

const sendRequestComment = (endpoint, commentObj) =>  {
  return fbRequest(endpoint, commentObj)
    .then(res => res.data)
    .catch(error => console.error('Error:', error));
};

export function postComment(commentObj) {
  return sendRequestComment('postComment', commentObj);
};
