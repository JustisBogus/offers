import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyD5IbwqGgcyExncT-O8_ZBgnEBBBoedmcc",
  authDomain: "ynotmedia-c592c.firebaseapp.com",
  databaseURL: "https://ynotmedia-c592c.firebaseio.com",
  projectId: "ynotmedia-c592c",
  storageBucket: "ynotmedia-c592c.appspot.com",
  messagingSenderId: "315032899265"
};
 var fire = firebase.initializeApp(config);
 export default fire;
