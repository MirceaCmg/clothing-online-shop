import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCP4ZEHgfvjIBwYbX6FgZX7s-mI1T0ECTY",
  authDomain: "clothes-shop-db-102b9.firebaseapp.com",
  databaseURL: "https://clothes-shop-db-102b9.firebaseio.com",
  projectId: "clothes-shop-db-102b9",
  storageBucket: "clothes-shop-db-102b9.appspot.com",
  messagingSenderId: "373557392150",
  appId: "1:373557392150:web:93e4ce217356a3cb85d637",
  measurementId: "G-LXEFLV56YC",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
 // create data
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
