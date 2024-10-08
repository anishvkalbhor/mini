import { auth } from './firebase'; // Import your initialized auth instance
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  getAuth 
} from 'firebase/auth';

// Create a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('User creation failed:', error);
    throw error; // Re-throw the error for further handling
  }
};

// Sign in an existing user with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Sign-in failed:', error);
    throw error; // Re-throw the error for further handling
  }
};

// Sign in using Google authentication
export const doSigninWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result; // You can return user info if needed
  } catch (error) {
    console.error('Google sign-in failed:', error);
    throw error; // Re-throw the error for further handling
  }
};

// Sign out the current user
export const doSignOut = async () => {
  try {
    await signOut(auth); // Use the already imported auth instance
  } catch (error) {
    console.error("Sign-out failed", error);
  }
};
