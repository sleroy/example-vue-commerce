
export interface SigninResponse {
    success: boolean,
    errorReason: any | undefined,
    token: any | undefined
}

export interface AuthenticationConnector {
    signin(): Promise<SigninResponse>;
}