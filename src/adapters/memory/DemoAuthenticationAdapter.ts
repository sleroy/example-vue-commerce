import { AuthenticationConnector } from '../../connectors/AuthenticationConnector';

export class DemoAuthenticationAdapter implements AuthenticationConnector {
    signin(): boolean {
        return true;
    }

}