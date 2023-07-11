import {
    type AuthenticationConnector,
    type SigninResponse
} from '../../connectors/AuthenticationConnector'

export class DemoAuthenticationAdapter implements AuthenticationConnector {
    async signin(): Promise<SigninResponse> {
        return Promise.resolve({
            success: true,
            errorReason: null,
            token: {
                token: "TEST",
                user: {}
            }
        })
    }
}
