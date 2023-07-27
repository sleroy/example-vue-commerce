import {
  type SignupResponse,
  type AuthenticationConnector,
  type SigninResponse
} from '../../connectors/AuthenticationConnector'
import {
  Amplify, Auth, Hub
} from 'aws-amplify';
import { amplify } from './AmplifyConfig';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

amplify.require();

export class AmplifyAuthenticationAdapter implements AuthenticationConnector {
  
  /**
   * Google signin implementation
   */
  async signin(): Promise<any> {
    console.log('Authentication with success')
  
    //TODO : test federation
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
  
  } catch(error: any) {
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

  async signup(username:string, email: string, password: string): Promise<SignupResponse> {
    try {
      const params = {
        username: email,
        password: password,
        attributes: {
          email, // optional
          given_name: "Random Given name",
          family_name: "Random Family name",
          //phoneNumber, // optional - E.164 number convention
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        }
      }
      const { user } = await Auth.signUp(params)
      const resp: SignupResponse = {
        idpUser: user,
      }
      return resp
    } catch (e) {
      console.error("Amplify sign up error", e)
      throw new Error("Cannot perform the sign up for the reason " + e);
    }
  }
}
