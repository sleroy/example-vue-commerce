import type { CheckoutRequest, CheckoutResponse, CheckoutServiceConnector } from "../../connectors/CheckoutServiceConnector";
import { Events, eventbus } from "../../domain/eventBus";

export class DemoCheckoutConnectorAdapter implements CheckoutServiceConnector {
    checkout(request: CheckoutRequest): Promise<CheckoutResponse> {
        eventbus.emit(Events.checkoutPerformed, request)
        console.log("Received checkout with cart ", { cart: request })
        return Promise.resolve({
            success: true
        })
    }
}