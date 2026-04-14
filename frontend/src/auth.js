const SESSION_KEY = "bravo_session";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const mapFirebaseError = (error) => {
  const code = error?.code || "";

  switch (code) {
    case "auth/email-already-in-use":
      return "Account already exists for this email";
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password";
    default:
      return error?.message || "Authentication failed";
  }
};

export const signUp = async ({
  email,
  password,
  role = "attendee",
  firstName = "",
  lastName = "",
  phone = "",
  gender = "",
  age = "",
}) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const uid = credential.user.uid;

    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      role,
      firstName,
      lastName,
      phone,
      gender,
      age,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isAnonymous: false,
    });

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ uid, email: credential.user.email, role }),
    );

    return { success: true, role };
  } catch (error) {
    return { success: false, error: mapFirebaseError(error) };
  }
};

export const signIn = async (email, password) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const uid = credential.user.uid;

    const profileDoc = await getDoc(doc(db, "users", uid));
    const profile = profileDoc.exists() ? profileDoc.data() : null;
    const role = profile?.role || "attendee";

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ uid, email: credential.user.email, role }),
    );

    return { success: true, role };
  } catch (error) {
    return { success: false, error: mapFirebaseError(error) };
  }
};

// Anonymous sidn in
export const signInAnonymous = async () => {
  try {
    const credential = await signInAnonymously(auth);
    const uid = credential.user.uid;

    // Store anonymous user in Firestore
    await setDoc(doc(db, "users", uid), {
      uid,
      isAnonymous: true,
      role: "attendee",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ uid, email: null, role: "attendee", isAnonymous: true }),
    );

    return { success: true, role: "attendee", isAnonymous: true };
  } catch (error) {
    return { success: false, error: mapFirebaseError(error) };
  }
};

// Check if user is anonymous
export const isAnonymousUser = () => {
  const user = auth.currentUser;
  return user?.isAnonymous || false;
};

// Upgrade anonymous to permanent account
export const upgradeAnonymousAccount = async ({
  email,
  password,
  role = "attendee",
  firstName = "",
  lastName = "",
  phone = "",
  gender = "",
  age = "",
}) => {
  try {
    const anonymousUser = auth.currentUser;

    if (!anonymousUser || !anonymousUser.isAnonymous) {
      return { success: false, error: "No anonymous user found" };
    }

    // Get anonymous user's data
    const anonymousDoc = await getDoc(doc(db, "users", anonymousUser.uid));
    const anonymousData = anonymousDoc.data() || {};

    // Create new email/password account
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const newUid = credential.user.uid;

    // Copy data to new user
    await setDoc(doc(db, "users", newUid), {
      uid: newUid,
      email,
      role: role || anonymousData.role || "attendee",
      firstName,
      lastName,
      phone,
      gender,
      age,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      previouslyAnonymous: true,
      isAnonymous: false,
    });

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        uid: newUid,
        email,
        role: role || anonymousData.role || "attendee",
      }),
    );

    return { success: true };
  } catch (error) {
    return { success: false, error: mapFirebaseError(error) };
  }
};

export const signOut = async () => {
  await firebaseSignOut(auth);
  localStorage.removeItem(SESSION_KEY);
  return { success: true };
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
};

// Get user role
export const getUserRole = async () => {
  const session = getCurrentUser();
  if (session?.role) return session.role;

  const user = auth.currentUser;
  if (!user) return null;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  return userDoc.data()?.role || "attendee";
};
