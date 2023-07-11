import {
  type AuthenticationConnector,
  type SigninResponse
} from '../../connectors/AuthenticationConnector'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { provider } from './firebaseConfig'

export class FirebaseAuthenticationAdapter implements AuthenticationConnector {
  async signin(): Promise<SigninResponse> {
    console.log('Attempting to signin using Firebase')

    try {
      const result = await signInWithPopup(getAuth(), provider)
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      if (!credential)
        return Promise.reject({
          success: false,
          errorReason: 'Cannot obtain the Google credentials',
          token: undefined
        })
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log("Authentication with success")
      return Promise.resolve({
        success: true,
        errorReason: null,
        token: {
            token,
            user
        }
      })
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
}
