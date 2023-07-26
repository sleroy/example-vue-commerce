import {
  type AuthenticationConnector,
  type SigninResponse
} from '../../connectors/AuthenticationConnector'
import {
  Amplify, Auth
} from 'aws-amplify';


export class AmplifyeAuthenticationAdapter implements AuthenticationConnector {
  /**
   * Google signin implementation
   */
  async signin(): Promise<SigninResponse> {
    console.log('Authentication with success')

    const userName = ""
    const email = ""
    const token: string = ""
    const user: any | undefined = ""

    return Promise.resolve({
      success: true,
      errorReason: null,
      username: userName || email || "unknown",
      token: {
        token,
        user
      }
    })
  } catch(error) {
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

  requireAuth(): boolean {
    return false;
  }

  passwordSignin(username: string, password: string): Promise<SigninResponse> {
    // TODO
    return Promise.reject({
      success: false,
      errorReason: 'Not implemented yet'
    })
  }
}
