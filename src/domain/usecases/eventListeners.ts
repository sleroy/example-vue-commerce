import { SigninResponse } from "../../connectors/AuthenticationConnector"
import { backend } from "../backend"
import { Events, eventbus, registerEventHandler } from "../eventBus"

const authSigninListener = (e) => {
    backend.auth.onSigninEventReceived(e as SigninResponse)
}

const authSignoutListener = (e) => {
    backend.auth.onSignoutEventReceived(e)
}

const authCustomOAuthStateListener = (e) => {
    backend.auth.onCustomOAuthStateEventReceived(e)
}



export function subscribeEventListeners() {
    registerEventHandler(Events.userSignin, authSigninListener)
    registerEventHandler(Events.userSignout, authSignoutListener)
    registerEventHandler(Events.customOAuthState, authCustomOAuthStateListener)
    backend.checkouts.registerCheckoutDB();
    registerEventHandler(Events.userSignin, e => backend.products.onUserSignin())
}

