import { AuthenticationConnector } from '../../connectors/AuthenticationConnector';

export class FirebaseAuthenticationAdapter implements AuthenticationConnector {
    signin(): boolean {
        return true;
    }

}