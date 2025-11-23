import { Fragment } from 'react';
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        
    }
    return (
        <Fragment>
            <div>
                <h1>Sign In Page</h1>
                <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            </div>
        </Fragment>
    )
}

export default SignIn;