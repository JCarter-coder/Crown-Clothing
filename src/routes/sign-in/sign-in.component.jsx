import { Fragment } from 'react';
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    // None of this works due to useEffect not supporting async functions
    // Lesson 'Sign In With Redirect' link:
    // https://academy.zerotomastery.io/courses/complete-react-developer/lectures/38530988
    /* useEffect(async () => {
        const response = await getRedirectResult(auth);
        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []); */

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    };

    return (
        <Fragment>
            <div>
                <h1>Sign In Page</h1>
                <button onClick={logGoogleUser}>
                    Sign in with Google Popup
                </button>
                <SignUpForm />
            </div>
        </Fragment>
        
    )
}

export default SignIn;