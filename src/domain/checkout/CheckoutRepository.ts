import { useCommerceStore } from '@/stores/commerce'
import { Events, eventbus } from '../eventBus'
import { type Emitter, type EventType } from 'mitt'
import { type CheckoutServiceConnector } from '../../connectors/CheckoutServiceConnector'

let checkoutRegistration = false;

export class CheckoutRepository {

    private eventBus: Emitter<Record<EventType, unknown>>
    
    constructor(private checkoutDB: CheckoutServiceConnector) {
        this.eventBus = eventbus
    }

    get store() {
        return useCommerceStore();
    }

    registerCheckoutDB() {
        this.checkoutDB.subscribe((checkoutEvent) => {
            console.log("Received checkout event", checkoutEvent)
            eventbus.emit(Events.checkoutPerformed, checkoutEvent)
        })
    }

}
