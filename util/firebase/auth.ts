import axios from 'axios';
import { auth } from '@/lib/firebase';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
  updatePassword,
  deleteUser,
} from 'firebase/auth';

export const logIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { user } = userCredential;
  await createUserDocument(user.uid, user.displayName || '', user.email || '');
  return user.uid;
};

export const logInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
  const { user } = userCredential;
  await createUserDocument(user.uid, user.displayName || '', user.email || '');
  return user.uid;
};

export const signUp = async (name: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await changeName(name);
  const { user } = userCredential;
  await createUserDocument(user.uid, user.displayName || '', user.email || '');
  return user.uid;
};

export const logOut = async () => {
  await signOut(auth);
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const changeName = async (displayName: string) => {
  if (!auth.currentUser) throw new Error('auth/no-current-user');
  await updateProfile(auth.currentUser, {
    displayName,
  });
};

export const changeEmail = async (email: string, password: string) => {
  if (!auth.currentUser) throw new Error('auth/no-current-user');
  const credentials = EmailAuthProvider.credential(
    auth.currentUser.email || '',
    password
  );
  await reauthenticateWithCredential(auth.currentUser, credentials);
  await updateEmail(auth.currentUser, email);
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  if (!auth.currentUser) throw new Error('auth/no-current-user');
  const credentials = EmailAuthProvider.credential(
    auth.currentUser.email || '',
    currentPassword
  );
  await reauthenticateWithCredential(auth.currentUser, credentials);
  await updatePassword(auth.currentUser, newPassword);
};

export const deleteAccount = async (password: string) => {
  if (!auth.currentUser) throw new Error('auth/no-current-user');
  const credentials = EmailAuthProvider.credential(
    auth.currentUser.email || '',
    password
  );
  await reauthenticateWithCredential(auth.currentUser, credentials);
  await deleteUser(auth.currentUser);
};

export const createUserDocument = async (
  uid: string,
  name: string,
  email: string
) => {
  await axios.post('/api/users', { uid, name, email });
};
