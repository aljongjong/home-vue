import firebase from "firebase/app";
import "firebase/database";

let config = {
    apiKey: "AIzaSyAuFAGBAFOWQ43Kk54ixJPx9s0R2cKhzBg",
    authDomain: "home-7d626.firebaseapp.com",
    projectId: "home-7d626",
    storageBucket: "home-7d626.appspot.com",
    messagingSenderId: "225246727902",
    appId: "1:225246727902:web:4d6b95646558fc99a67c4f"
};

firebase.initializeApp(config);

export default firebase.database();