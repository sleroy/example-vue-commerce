import { SigninResponse } from "../../connectors/AuthenticationConnector"
import { backend } from "../backend"
import { Events, eventbus, registerEventHandler } from "../eventBus"

/**
const authSigninListener = (e) => {
    backend.auth.onSigninEventReceived(e as SigninResponse)
}
 */


export function subscribeEventListeners() {
    // registerEventHandler(Events.userSignin, authSigninListener)

}

