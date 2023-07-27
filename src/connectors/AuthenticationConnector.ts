
export interface SigninResponse {
    success: boolean,
    errorReason: any | undefined,
    token: any | undefined,
    username: string
}

export interface SignupResponse {
    idpUser: any | undefined | null;
}

export interface AuthenticationConnector {
    passwordSignin(username: string, password: string): Promise<any>;
    signin(): Promise<any>;
    signup(username:string, email:string, password:string): Promise<any>
}