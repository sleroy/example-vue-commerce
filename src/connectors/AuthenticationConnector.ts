
export interface SigninResponse {
    success: boolean,
    errorReason: any | undefined,
    token: any | undefined,
    username: string
}

export interface AuthenticationConnector {
    passwordSignin(username: string, password: string): Promise<SigninResponse>;
    signin(): Promise<SigninResponse>;
}