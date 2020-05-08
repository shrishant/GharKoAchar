import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyCrDa1IzxAbBv9jHxMCfRqYWdYFfyCXYMA',
  authDomain: 'gharkoachar-554f9.firebaseapp.com',
  databaseURL: 'https://gharkoachar-554f9.firebaseio.com',
  projectId: 'gharkoachar-554f9',
  storageBucket: 'gharkoachar-554f9.appspot.com',
  messagingSenderId: '222988760514',
  appId: '1:222988760514:web:c2917de52349351da7525b',
  measurementId: 'G-B63V71X2E8',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export default firebase;
