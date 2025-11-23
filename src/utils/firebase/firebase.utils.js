import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  // Your web app's Firebase configuration
  // These credentials are considered safe to be exposed publicly
  apiKey: "AIzaSyCLxuIsspc84bWRF154ScK0Na8vuyr8tvQ",
  authDomain: "crown-clothing-db-ff6de.firebaseapp.com",
  projectId: "crown-clothing-db-ff6de",
  storageBucket: "crown-clothing-db-ff6de.firebasestorage.app",
  messagingSenderId: "504070232600",
  appId: "1:504070232600:web:50b83bbfd902515691816d",
  measurementId: "G-E00Q3QDSHF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // if user data does not exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    // create / set the document with the data from userAuth in my collection
    return userDocRef;
}