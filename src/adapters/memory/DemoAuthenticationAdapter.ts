import {
    type AuthenticationConnector,
    type SigninResponse
} from '../../connectors/AuthenticationConnector'

export class DemoAuthenticationAdapter implements AuthenticationConnector {
    requireAuth(): boolean {
        return true;
    }

    async signin(): Promise<SigninResponse> {
        return Promise.resolve({
            success: true,
            errorReason: null,
            username: "example",
            token: {                
                token: "TEST",
                user: {}
            }
        })
    }

    passwordSignin(username: string, password: string): Promise<SigninResponse> {
        return Promise.resolve({
            success: true,
            errorReason: null,
            username: "example",
            token: {
                token: "TEST",
                user: {}
            }
        })
    }

}
