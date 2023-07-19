import { useCommerceStore } from '@/stores/commerce'
import { obtainCheckout } from '../../adapters/AdapterStrategy'
import { Events, eventbus, registerEventHandler } from '../eventBus'
import { type Emitter, type EventType } from 'mitt'
import { type CheckoutServiceConnector } from '../../connectors/CheckoutServiceConnector'

let checkoutRegistration = false;

export class CheckoutRepository {
    private eventBus: Emitter<Record<EventType, unknown>>
    
    constructor(private checkoutDB: CheckoutServiceConnector) {
        this.eventBus = eventbus

        if (!checkoutRegistration) {
            // We listen to userSignin event
            registerEventHandler(Events.userSignin, (e) => {
                console.log("Subscribe to checkout events", e)
                this.checkoutDB.subscribe((checkoutEvent) => {
                    console.log("Received checkout event", checkoutEvent)
                    eventbus.emit(Events.checkoutPerformed, checkoutEvent)
                })
            })
            checkoutRegistration = true;
        }
    }

    get store() {
        return useCommerceStore();
    }

}
