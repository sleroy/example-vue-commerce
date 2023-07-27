import {
  type AuthenticationConnector,
  type SigninResponse,
  type SignupResponse
} from '../../connectors/AuthenticationConnector'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, type UserCredential, type User, signInWithEmailAndPassword } from 'firebase/auth'
import { provider } from './firebaseConfig'
import { eventbus } from '@/domain/eventBus'
import { Events } from '../../domain/eventBus';

export class FirebaseAuthenticationAdapter implements AuthenticationConnector {
  /**
   * Google signin implementation
   */
  async signin(): Promise<any> {
    console.log('Attempting to signin using Firebase')

    try {
      const result = await signInWithPopup(getAuth(), provider)
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      if (!credential) {
        return Promise.reject({
          success: false,
          errorReason: 'Cannot obtain the Google credentials',
          token: undefined
        })
      }
      const token = credential.accessToken
      // The signed-in user info.
      const user: User = result.user
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      const positiveResponse = {
        success: true,
        errorReason: null,
        username: user.displayName || user.email || "unknown",
        token: {
          token,
          user
        }
      };
      eventbus.emit(Events.userSignin, positiveResponse)
      return Promise.resolve(positiveResponse)
    } catch (error) {
      // Handle Errors here.
      /**
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
       */
      console.error('Cannot signin for the reason : ', error)
      return Promise.reject({
        success: false,
        errorReason: error
      })
    }
  }

  requireAuth() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid
        // ...
        return true
      } else {
        // User is signed out
        // ...
        return false
      }
    })
  }

 passwordSignin(username: string, password: string): Promise<any> {
   const auth = getAuth();
   return signInWithEmailAndPassword(auth, username, password)
     .then((userCredential) => {
       // Signed in 
       const user = userCredential.user;
       const positiveResponse = {
         success: true,
         errorReason: null,
         username: user.displayName || user.email || "unknown",
         token: {
           user
         }
       };
       eventbus.emit(Events.userSignin, positiveResponse)
     })
  }

  async signup(username:string, email: string, password: string): Promise<SignupResponse> {
    try {
      const fbaseResponse = await createUserWithEmailAndPassword(getAuth(), email, password)
      const resp: SignupResponse = {
        idpUser: fbaseResponse.user
      }
      return resp
    } catch (e) {
      console.error("Firebase sign up error", e)
      throw new Error("Cannot perform the sign up for the reason " + e);
    }
  }
}
