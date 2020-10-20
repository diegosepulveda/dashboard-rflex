import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyDBKkzYjhBwi4NA8MP28aaAaiXav5gKut4",
    authDomain: "dashboard-rflex.firebaseapp.com",
    databaseURL: "https://project-734615704300.firebaseio.com",
    projectId: "project-734615704300",
    storageBucket: "project-734615704300.appspot.com",
    messagingSenderId: "",
    appId: "734615704300-orj66uk27pf6ig29i6m7mq1kp98n60rr.apps.googleusercontent.com",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);

export default firebase