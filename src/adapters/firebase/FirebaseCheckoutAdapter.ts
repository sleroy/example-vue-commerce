import type { CheckoutRequest, CheckoutResponse, CheckoutServiceConnector } from "../../connectors/CheckoutServiceConnector";

export class FirebaseCheckoutAdapter implements CheckoutServiceConnector {
    checkout(request: CheckoutRequest): Promise<CheckoutResponse> {
        throw new Error("Method not implemented.");
    }
}