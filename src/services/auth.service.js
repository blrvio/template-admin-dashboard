import firebase_app from './firebase.service';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth';

export const auth = getAuth(firebase_app);

export async function signUp(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { result, error };
}

export const signIn = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { result, error };
};

export const signOut = async () => {
  let error = null;
  try {
    await firebaseSignOut(auth);
  } catch (e) {
    error = e;
  }
  return { error };
};

export const forgot = async (email) => {
  let error = null;
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (e) {
    error = e;
  }
  return { error };
};

export const signInWithGoogle = async () => {
  let result = null,
    error = null;
  try {
    const provider = new GoogleAuthProvider();
    //TODO: adicionar um screen loader
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }
  return { result, error };
};

export const signInWithFacebook = async () => {
  let result = null,
    error = null;
  try {
    const provider = new FacebookAuthProvider();
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }
  return { result, error };
};
