import { type Token } from "../authentication/Token";

export interface UserInfo {
    isLoggedIn: boolean;
    isSignedUp: boolean;
    hasSearched: boolean;
    name: string,
    productTitleSearched: string,
    token: Token | undefined
}