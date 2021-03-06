// *** MODULE CREATES OVERALL PAGE STRUCTURE AND RESTORES LOCAL DATA *** //
import { pageStructure } from './pageStructure.js';
import { previewPage, hidePreviewPage } from './previewPage.js';
// *** FIREBASE IMPORTS *** //
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { makeSignOutBtn, updateUserDetails } from './signIn';
import { createSampleData } from './projectData.js';
import './style.css';

//firebase config
const firebaseConfig = {
    apiKey: "AIzaSyB2MEBcXnFbykRaGGyt8bDbiVEJKVCscwA",
    authDomain: "the-today-list.firebaseapp.com",
    projectId: "the-today-list",
    storageBucket: "the-today-list.appspot.com",
    messagingSenderId: "305659011664",
    appId: "1:305659011664:web:46d090720b1e11f0d5e755",
    measurementId: "G-YGTM66E1WK"
};
  
(function buildPage(){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //builds the page
    pageStructure();
})();

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        hidePreviewPage();
        document.getElementById("signInButton").style.display = "none";
        makeSignOutBtn();
        updateUserDetails();
        createSampleData();
        document.getElementById("plusProject").style.display = "block";
      // ...
    } else {
        document.getElementById("plusProject").style.display = "none";
        previewPage();
    }
}); 
  
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

export { provider }
export { db }